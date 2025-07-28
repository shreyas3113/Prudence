// Google Gemini API Integration
// This file handles all Google Gemini API calls and response processing
//
// SETUP INSTRUCTIONS:
// 1. Get your Google AI API key from: https://makersuite.google.com/app/apikey
// 2. Set the values in Firebase Remote Config:
//    - gemini_api_key: your API key
//    - gemini_api_endpoint: https://generativelanguage.googleapis.com/v1beta/models
// 3. Publish the Remote Config changes
//
// TESTING:
// After setup, you can test the connection by calling:
// geminiAPI.testConnection().then(success => console.log('Test result:', success));

import { getRemoteConfig, getValue, fetchAndActivate } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-remote-config.js";
import { app } from '../core/firebase.js';

class GeminiAPI {
    constructor() {
        // Initialize Remote Config
        this.remoteConfig = getRemoteConfig(app);
        this.remoteConfig.settings.minimumFetchIntervalMillis = 0; // Allow immediate fetch
        
        // Initialize with null values - will be loaded from Remote Config
        this.apiKey = null;
        this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models';
        this.defaultModel = 'gemini-2.0-flash';
        this.isConfigured = false;
        
        // Available Gemini models (Free Tier)
        this.availableModels = {
            'gemini-2.5-flash': {
                name: 'Gemini 2.5 Flash',
                description: 'Latest fast and efficient model for most tasks',
                maxTokens: 8192
            },
            'gemini-2.0-flash': {
                name: 'Gemini 2.0 Flash',
                description: 'Fast and reliable model for everyday tasks',
                maxTokens: 8192
            }
        };
        
        // Load configuration from Remote Config
        this.loadRemoteConfig();
    }

    // Load configuration from Firebase Remote Config
    async loadRemoteConfig() {
        try {
            console.log('🔄 Loading Gemini configuration from Firebase Remote Config...');
            await fetchAndActivate(this.remoteConfig);
            
            // Get values from Remote Config
            const apiKey = getValue(this.remoteConfig, "gemini_api_key");
            
            console.log('🔍 Debug - Remote Config values:');
            console.log('🔍 gemini_api_key exists:', !!apiKey);
            
            // Check and set API Key
            if (apiKey) {
                const apiKeyValue = apiKey.asString();
                console.log('🔍 Debug - API Key value length:', apiKeyValue.length);
                
                if (apiKeyValue && apiKeyValue.length > 0) {
                    this.apiKey = apiKeyValue;
                    console.log('✅ API Key loaded from Remote Config:', this.apiKey.substring(0, 10) + '...');
                } else {
                    throw new Error('Remote Config API Key is empty');
                }
            } else {
                throw new Error('Remote Config API Key not found');
            }
            
            this.isConfigured = true;
            console.log('✅ Gemini configuration loaded successfully from Remote Config');
            
        } catch (error) {
            console.error('❌ Failed to load Remote Config for Gemini:', error);
            console.error('❌ Gemini API will not be available until Remote Config is properly configured');
            this.isConfigured = false;
        }
    }

    // Check if API is properly configured
    isReady() {
        return this.isConfigured && this.apiKey;
    }

    // Set API credentials (call this after getting your credentials)
    setCredentials(apiKey, model = 'gemini-2.0-flash') {
        this.apiKey = apiKey;
        this.defaultModel = model;
        this.isConfigured = true;
        console.log('✅ Gemini API credentials configured manually');
    }

    // Generate response using Gemini API
    async generateResponse(prompt, options = {}) {
        if (!this.isReady()) {
            throw new Error('Gemini API is not configured. Please set up your API key in Firebase Remote Config.');
        }

        const model = options.model || this.defaultModel;
        const temperature = options.temperature || 0.7;
        const maxTokens = options.maxTokens || this.availableModels[model]?.maxTokens || 8192;

        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        };

        // Add optional generation config if temperature is specified
        if (temperature !== 0.7 || maxTokens !== 8192) {
            requestBody.generationConfig = {
                temperature: temperature,
                maxOutputTokens: maxTokens
            };
        }

        try {
            console.log(`🚀 Sending request to Gemini API (${model})...`);
            
            const response = await fetch(`${this.apiEndpoint}/${model}:generateContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': this.apiKey
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const generatedText = data.candidates[0].content.parts[0].text;
                console.log('✅ Gemini response generated successfully');
                return {
                    text: generatedText,
                    model: model,
                    usage: data.usageMetadata || null,
                    safetyRatings: data.candidates[0].safetyRatings || null
                };
            } else {
                throw new Error('Invalid response format from Gemini API');
            }

        } catch (error) {
            console.error('❌ Error calling Gemini API:', error);
            throw error;
        }
    }

    // Test connection to Gemini API
    async testConnection() {
        try {
            console.log('🧪 Testing Gemini API connection...');
            
            const testPrompt = "Hello! Please respond with 'Gemini API is working correctly.'";
            const response = await this.generateResponse(testPrompt, { maxTokens: 50 });
            
            console.log('✅ Gemini API connection test successful');
            return {
                success: true,
                message: 'Gemini API is working correctly',
                response: response.text
            };
            
        } catch (error) {
            console.error('❌ Gemini API connection test failed:', error);
            return {
                success: false,
                message: error.message,
                error: error
            };
        }
    }



    // Get available models
    async getAvailableModels() {
        try {
            console.log('📋 Fetching available Gemini models...');
            
            const response = await fetch(`${this.apiEndpoint}`, {
                headers: {
                    'X-goog-api-key': this.apiKey
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch models: ${response.status}`);
            }
            
            const data = await response.json();
            const geminiModels = data.models?.filter(model => 
                model.name.includes('gemini') && 
                model.supportedGenerationMethods?.includes('generateContent')
            ) || [];
            
            console.log('✅ Available Gemini models fetched:', geminiModels.length);
            return geminiModels;
            
        } catch (error) {
            console.error('❌ Error fetching Gemini models:', error);
            throw error;
        }
    }

    // Get API status and configuration
    getStatus() {
        return {
            configured: this.isConfigured,
            apiKey: this.apiKey ? '***' + this.apiKey.slice(-4) : null,
            endpoint: this.apiEndpoint,
            defaultModel: this.defaultModel,
            availableModels: Object.keys(this.availableModels)
        };
    }

    // Get model information
    getModelInfo(modelName) {
        return this.availableModels[modelName] || null;
    }

    // List all available models
    listModels() {
        return Object.keys(this.availableModels);
    }
}

// Create and export a singleton instance
export const geminiAPI = new GeminiAPI();

// Export the class for testing purposes
export { GeminiAPI }; 