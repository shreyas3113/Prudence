# Prudence AI - The Collective Mind

A modern AI chat interface that allows users to interact with multiple AI models simultaneously using ensemble mode.

## Features

- **Ensemble Mode**: Get responses from multiple AI models simultaneously
- **Google Gemini Integration**: Direct API integration with Gemini 2.5 Flash and 2.0 Flash models (Free Tier)
- **Cerebras Integration**: Access to Cerebras LLM models (Llama, Qwen variants)
- **Firebase Integration**: Secure authentication and real-time chat history storage
- **Personality Development FAQs**: 100+ pre-loaded FAQs for personality development topics
- **Web Development FAQs**: Comprehensive web development knowledge base
- **Real-time Chat History**: Save and load conversations with Firebase
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Theme Toggle**: Light/dark mode support

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Authentication, Realtime Database)
- **AI Models**: GPT-4, Claude, Gemini, Perplexity, Copilot, Bard, LLaMA
- **Architecture**: Modular JavaScript with ES6 modules

## Project Structure

```
Prudence Ai/
├── index.html          # Main HTML file
├── styles/
│   └── main.css        # Main stylesheet
├── js/
│   ├── core/
│   │   ├── firebase.js # Firebase configuration
│   │   └── auth.js     # Authentication functions
│   ├── modules/
│   │   ├── aiModels.js # AI model configurations
│   │   ├── cerebras.js # Cerebras API integration
│   │   ├── gemini.js   # Google Gemini API integration
│   │   ├── faq.js      # FAQ management
│   │   └── theme.js    # Theme management
│   └── script.js       # Main application logic
├── assets/
│   └── images/         # AI model icons
├── data/               # Sample data files
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🚀 Quick Start

### **For Viewing (No Setup Required)**
- **Live Demo**: Visit the GitHub Pages link (available after repository setup)
- **Local View**: Simply open `index.html` in any web browser
- **Note**: Firebase features and AI APIs require proper configuration

### **For Full Functionality (Requires Setup)**
1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Prudence-Ai
   ```

2. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Enable Realtime Database
   - **Security Note**: The Firebase API key in the code is public and safe to expose
   - For production, consider using environment variables for the project ID

3. **Configure AI APIs (Optional)**
   
   **Google Gemini API Setup:**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - In Firebase Console, go to Remote Config
   - Add a new parameter: `gemini_api_key` with your API key as the value
   - Publish the Remote Config changes
   - **Note**: Free tier includes Gemini 2.5 Flash and Gemini 2.0 Flash models
   - **Security**: API keys are stored securely in Firebase Remote Config, not in code
   
   **Cerebras API Setup:**
   - Get your API key from [Cerebras Model Zoo](https://modelzoo.cerebras.net/)
   - In Firebase Console, go to Remote Config
   - Add parameters: `cerebras_api_key` and `cerebras_api_endpoint`
   - Publish the Remote Config changes

3. **Run the Application**
   - Open `index.html` in a web browser
   - Or use a local server: `python -m http.server 8000`

## 📋 Features Overview

### **UI/UX Features (Always Available)**
- ✅ **Complete interface demonstration**
- ✅ **AI model selection interface**
- ✅ **Theme switching (light/dark mode)**
- ✅ **Responsive design**
- ✅ **Chat interface layout**
- ✅ **FAQ system (local data)**
- ✅ **Ensemble mode interface**

### **Firebase Features (Requires Setup)**
- 🔥 **User authentication (login/signup)**
- 🔥 **Chat history saving**
- 🔥 **Real-time data synchronization**
- 🔥 **FAQ data persistence**
- 🔥 **Multi-user support**

## Features in Detail

### Ensemble Mode
- Always enabled by default
- Supports up to 3 AI models simultaneously
- Real-time response comparison
- All responses saved to chat history

### FAQ System
- 100+ personality development questions
- Web development knowledge base
- Smart matching algorithm
- Automatic Firebase synchronization

### Chat History
- Firebase Realtime Database storage
- Automatic chat saving
- Chat history sidebar
- Delete individual chats

### Authentication
- Email/password authentication
- Secure Firebase integration
- User-specific chat history
- Automatic login state management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
