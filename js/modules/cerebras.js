// Cerebras API Integration
// This file handles all Cerebras API calls and response processing
//
// SETUP INSTRUCTIONS:
// 1. Get your Cerebras API key from: https://modelzoo.cerebras.net/
// 2. Set the values in Firebase Remote Config:
//    - cerebras_api_key: your API key
//    - cerebras_api_endpoint: your endpoint URL
// 3. Publish the Remote Config changes
//
// TESTING:
// After setup, you can test the connection by calling:
// cerebrasAPI.testConnection().then(success => console.log('Test result:', success));

import { getRemoteConfig, getValue, fetchAndActivate } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-remote-config.js";
import { app } from '../core/firebase.js';

class CerebrasAPI {
    constructor() {
        // Initialize Remote Config
        this.remoteConfig = getRemoteConfig(app);
        this.remoteConfig.settings.minimumFetchIntervalMillis = 0; // Allow immediate fetch
        
        // Initialize with null values - will be loaded from Remote Config
        this.apiKey = null;
        this.apiEndpoint = null;
        this.model = 'cerebras-llm';
        this.isConfigured = false;
        
        // Load configuration from Remote Config
        this.loadRemoteConfig();
    }

    // Load configuration from Firebase Remote Config
    async loadRemoteConfig() {
        try {
            console.log('🔄 Loading Cerebras configuration from Firebase Remote Config...');
            await fetchAndActivate(this.remoteConfig);
            
            // Get values from Remote Config
            const apiKey = getValue(this.remoteConfig, "cerebras_api_key");
            const apiEndpoint = getValue(this.remoteConfig, "cerebras_api_endpoint");
            
            console.log('🔍 Debug - Remote Config values:');
            console.log('🔍 cerebras_api_key exists:', !!apiKey);
            console.log('🔍 cerebras_api_endpoint exists:', !!apiEndpoint);
            
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
            
            // Check and set Endpoint
            if (apiEndpoint) {
                const endpointValue = apiEndpoint.asString();
                console.log('🔍 Debug - Endpoint value length:', endpointValue.length);
                
                if (endpointValue && endpointValue.length > 0) {
                    this.apiEndpoint = endpointValue;
                    console.log('✅ Endpoint loaded from Remote Config:', this.apiEndpoint);
                } else {
                    throw new Error('Remote Config Endpoint is empty');
                }
            } else {
                throw new Error('Remote Config Endpoint not found');
            }
            
            this.isConfigured = true;
            console.log('✅ Cerebras configuration loaded successfully from Remote Config');
            
        } catch (error) {
            console.error('❌ Failed to load Remote Config for Cerebras:', error);
            console.error('❌ Cerebras API will not be available until Remote Config is properly configured');
            this.isConfigured = false;
        }
    }

    // Check if API is properly configured
    isReady() {
        return this.isConfigured && this.apiKey && this.apiEndpoint;
    }

    // Set API credentials (call this after getting your credentials)
    setCredentials(apiKey, apiEndpoint, model = 'cerebras-llm') {
        this.apiKey = apiKey;
        this.apiEndpoint = apiEndpoint;
        this.model = model;
        this.isConfigured = true;
        console.log('✅ Cerebras API credentials configured manually');
    }

    // Try alternative endpoints if the main one fails
    async tryAlternativeEndpoints(prompt, options) {
        const endpoints = [
            'https://api.cerebras.ai/v1/chat/completions',
            'https://api.cerebras.ai/v1/completions'
        ];

        for (const endpoint of endpoints) {
            try {
                console.log(`🔄 Trying endpoint: ${endpoint}`);
                
                const requestPayload = {
                    messages: [
                        {
                            role: "system",
                            content: ""
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    model: 'llama-4-scout-17b-16e-instruct',
                    stream: false,
                    max_completion_tokens: options.maxTokens || 2048,
                    temperature: options.temperature || 0.2,
                    top_p: 1
                };

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(requestPayload)
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(`✅ Success with endpoint: ${endpoint}`);
                    
                    let responseText = '';
                    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                        responseText = data.choices[0].message.content.trim();
                    } else if (data.choices && data.choices[0] && data.choices[0].text) {
                        responseText = data.choices[0].text.trim();
                    } else if (data.text) {
                        responseText = data.text.trim();
                    } else {
                        responseText = 'No response generated from Cerebras.';
                    }

                    return {
                        success: true,
                        text: responseText,
                        model: this.model,
                        endpoint: endpoint,
                        usage: data.usage || null
                    };
                }
            } catch (error) {
                console.log(`❌ Failed with endpoint ${endpoint}:`, error.message);
                continue;
            }
        }
        
        throw new Error('All Cerebras API endpoints failed');
    }

    // Main method to generate response from Cerebras
    async generateResponse(prompt, options = {}) {
        try {
            if (!this.isReady()) {
                throw new Error('Cerebras API is not configured. Please set your API credentials.');
            }

            const modelName = options.model || 'llama-4-scout-17b-16e-instruct';

            console.log('🤖 Calling Cerebras API...');
            console.log('🔗 Endpoint:', this.apiEndpoint);
            console.log('🔑 API Key:', this.apiKey.substring(0, 10) + '...');
            console.log('🧠 Model:', modelName);

            // Prepare the request payload using the correct Cerebras format
            const requestPayload = {
                messages: [
                    {
                        role: "system",
                        content: ""
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: modelName, // Use the selected model
                stream: false, // Set to false for non-streaming
                max_completion_tokens: options.maxTokens || 2048,
                temperature: options.temperature || 0.2,
                top_p: 1
            };

            console.log('📤 Request payload:', JSON.stringify(requestPayload, null, 2));

            // Make the API call
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestPayload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Cerebras API Error: ${response.status} - ${errorData.error || response.statusText}`);
            }

            const data = await response.json();
            
            // Extract the response text from chat completions format
            let responseText = '';
            if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                responseText = data.choices[0].message.content.trim();
            } else if (data.choices && data.choices[0] && data.choices[0].text) {
                responseText = data.choices[0].text.trim();
            } else if (data.text) {
                responseText = data.text.trim();
            } else if (data.response) {
                responseText = data.response.trim();
            } else {
                responseText = 'No response generated from Cerebras.';
            }

            console.log('✅ Cerebras response received');
            return {
                success: true,
                text: responseText,
                model: this.model,
                usage: data.usage || null
            };

        } catch (error) {
            console.error('❌ Primary Cerebras API Error:', error.message);
            console.log('🔄 Trying alternative endpoints...');
            
            try {
                const fallbackResult = await this.tryAlternativeEndpoints(prompt, options);
                return fallbackResult;
            } catch (fallbackError) {
                console.error('❌ All Cerebras API endpoints failed:', fallbackError.message);
                return {
                    success: false,
                    error: fallbackError.message,
                    text: `Sorry, I couldn't get a response from Cerebras: ${fallbackError.message}`
                };
            }
        }
    }

    // Test the API connection
    async testConnection() {
        try {
            const result = await this.generateResponse('Hello, this is a test message.', { maxTokens: 50 });
            if (result.success) {
                console.log('✅ Cerebras API connection test successful');
                return true;
            } else {
                console.log('❌ Cerebras API connection test failed:', result.error);
                return false;
            }
        } catch (error) {
            console.error('❌ Cerebras API connection test failed:', error);
            return false;
        }
    }

    // Test different model names
    async testModelNames() {
        const modelNames = [
            'llama-4-scout-17b-16e-instruct',
            'llama-4-scout-17b-16e',
            'llama-4-scout-17b',
            'cerebras-llm-13b',
            'cerebras-llm-7b'
        ];

        for (const modelName of modelNames) {
            try {
                console.log(`🧪 Testing model: ${modelName}`);
                
                const requestPayload = {
                    messages: [
                        {
                            role: "system",
                            content: ""
                        },
                        {
                            role: "user",
                            content: "Hello"
                        }
                    ],
                    model: modelName,
                    stream: false,
                    max_completion_tokens: 50,
                    temperature: 0.2,
                    top_p: 1
                };

                const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(requestPayload)
                });

                if (response.ok) {
                    console.log(`✅ Model ${modelName} works!`);
                    return modelName;
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    console.log(`❌ Model ${modelName} failed: ${response.status} - ${errorData.error || response.statusText}`);
                }
            } catch (error) {
                console.log(`❌ Model ${modelName} error:`, error.message);
            }
        }
        
        console.log('❌ No working model found');
        return null;
    }

    // Get API status
    getStatus() {
        return {
            configured: this.isConfigured,
            hasApiKey: this.apiKey !== null,
            hasEndpoint: this.apiEndpoint !== null
        };
    }
}

// Create and export a singleton instance
const cerebrasAPI = new CerebrasAPI();

export { cerebrasAPI, CerebrasAPI }; 