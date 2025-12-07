# 🏥 Sil-Health - Smart Medical Assistant

<div align="center">

![Sil-Health Logo](public/unnamed.jpg)

**An intelligent medical assistant powered by Google Gemini**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-2.0.1-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.158.0-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Sil-Health** is a cutting-edge medical assistant application that leverages the power of Google's Gemini to provide intelligent medical consultations, image analysis, and personalized health guidance. Built with modern web technologies, it offers a seamless, responsive, and intuitive user experience.

### 🎯 Key Highlights

- 🤖 **Smart Conversations**: Natural language medical consultations using Gemini 2.5 Flash
- 📸 **Medical Image Analysis**: Advanced analysis of X-rays, prescriptions, and medication photos
- 🧠 **Context-Aware Chat**: Intelligent memory system that remembers previous image analyses
- 🌓 **Dark/Light Mode**: Beautiful themes for comfortable viewing
- 🌐 **Bilingual Support**: Seamless Arabic/English language switching
- 📱 **Responsive Design**: Optimized for all devices

---

## ✨ Features

### 🩺 Medical Consultation Chat

- Real-time intelligent medical Q&A
- Context-aware responses based on uploaded images
- Conversational interface with typing indicators
- Medical advice covering symptoms, treatments, and medications

### 📷 Image Analysis

- **Supported Image Types**:
  - 💊 Medication and pill identification
  - 🩻 X-ray and scan interpretation
  - 📄 Medical report analysis
  - 💉 Prescription reading

- **Analysis Features**:
  - Detailed identification and purpose
  - Usage and dosage recommendations
  - Risk and side effect warnings
  - Safety precautions
  - Emergency guidance

### 🧠 Smart Context Memory

- Automatically saves image analysis results
- Uses context for follow-up questions
- Intelligent detection of context relevance
- Visual indicator for active context
- Seamless context switching between images

### 🎨 User Experience

- **Modern UI/UX**:
  - Clean, professional design
  - Smooth animations and transitions
  - Intuitive navigation
  - Drag-and-drop image upload
  
- **Accessibility**:
  - Dark/Light theme toggle
  - Bilingual interface (Arabic/English)
  - Responsive layout for mobile/tablet/desktop
  - Clear visual feedback

### 📊 Analysis Display

- Real-time analysis progress
- Structured result presentation
- Interactive 3D visualizations (Three.js)
- Image preview with metadata

---

## 🛠 Tech Stack

### Frontend Framework
- **React 18.2** - Modern UI library with hooks
- **Vite 4.4** - Lightning-fast build tool
- **Redux Toolkit 2.0** - State management

### Styling & Design
- **TailwindCSS 3.3** - Utility-first CSS framework
- **Font Awesome 6.4** - Icon library
- **Custom CSS** - Enhanced animations and effects

### AI & Integration
- **Google Gemini** - Gemini 2.5 Flash model
- **REST API** - Direct Gemini API integration

### 3D Graphics
- **Three.js 0.158** - WebGL 3D rendering

### Development Tools
- **PostCSS 8.4** - CSS processing
- **Autoprefixer 10.4** - CSS vendor prefixing
- **Git** - Version control

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** ([Get yours here](https://makersuite.google.com/app/apikey))

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sil-health.git
   cd sil-health
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## ⚙ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | ✅ Yes |

### Customization

You can customize the application by modifying:

- **Theme Colors**: `tailwind.config.js`
- **System Prompts**: `src/utils/gemini.js`
- **Initial Messages**: `src/store/slices/chatSlice.js`
- **Language Strings**: Throughout component files

---

## 📖 Usage

### Starting a Medical Consultation

1. **Type your question** in the chat input
2. **Press Enter** or click the Send button
3. **Receive smart response** with medical guidance

### Analyzing Medical Images

1. **Click or drag-and-drop** an image to the upload area
2. **Wait for analysis** (usually 2-5 seconds)
3. **View detailed results** in the analysis panel
4. **Ask follow-up questions** - the system remembers the context!

### Example Workflows

#### Workflow 1: Medication Information
```
1. Upload a photo of medication
2. System analyzes: "Paracetamol 500mg..."
3. Ask: "What's the proper dosage?"
4. Get context-aware answer about that specific medication
```

#### Workflow 2: X-Ray Consultation
```
1. Upload an X-ray image
2. System provides medical interpretation
3. Ask: "What precautions should I take?"
4. Receive guidance based on the X-ray analysis
```

---

## 📁 Project Structure

```
sil-health/
├── public/
│   └── unnamed.jpg              # App logo
├── src/
│   ├── components/
│   │   ├── Analysis/
│   │   │   └── AnalysisDisplay.jsx    # Analysis results display
│   │   ├── Chat/
│   │   │   ├── ChatInterface.jsx      # Main chat component
│   │   │   └── Message.jsx            # Message bubble component
│   │   ├── ImageUpload/
│   │   │   └── ImageUploader.jsx      # Image upload & processing
│   │   └── Layout/
│   │       └── Header.jsx             # App header with theme toggle
│   ├── store/
│   │   ├── slices/
│   │   │   ├── appSlice.js            # App-wide state (theme, language)
│   │   │   ├── chatSlice.js           # Chat & context state
│   │   │   └── imageSlice.js          # Image upload state
│   │   └── store.js                   # Redux store configuration
│   ├── styles/
│   │   └── index.css                  # Global styles & animations
│   ├── utils/
│   │   ├── gemini.js                  # Gemini API integration
│   │   └── threeScene.js              # Three.js 3D scene
│   ├── App.jsx                        # Main app component
│   └── main.jsx                       # Entry point
├── .env.local                         # Environment variables (create this)
├── index.html                         # HTML template
├── package.json                       # Dependencies
├── tailwind.config.js                 # Tailwind configuration
├── vite.config.js                     # Vite configuration
└── README.md                          # This file
```

---

## 🔑 Key Components

### GeminiAPI (`src/utils/gemini.js`)
- **sendMessage(message, imageContext)** - Context-aware chat
- **analyzeImage(imageFile)** - Medical image analysis
- **fileToBase64(file)** - Image encoding utility

### Redux Slices
- **chatSlice** - Messages, typing state, image context
- **imageSlice** - Upload state, analysis results
- **appSlice** - Theme, language preferences

### React Components
- **ChatInterface** - Main chat with context indicator
- **ImageUploader** - Drag-and-drop upload with preview
- **AnalysisDisplay** - Structured analysis results
- **Header** - Navigation with theme/language toggles

---

## 🌐 API Integration

### Gemini Integration

The app uses Google's Gemini 2.5 Flash model for:

- **Text Generation**: Medical Q&A responses
- **Vision Analysis**: Image interpretation
- **Context Awareness**: Multi-turn conversations

**API Configuration**:
```javascript
Model: gemini-2.5-flash
Temperature: 0.6
Max Tokens: 1024 (chat), 2048 (image analysis)
```

---

## 🎨 Themes

### Light Mode
- Clean white background
- Professional medical aesthetic
- High contrast for readability

### Dark Mode
- Eye-friendly dark theme
- Reduced eye strain
- Modern gradient effects

Toggle with the moon/sun icon in the header!

---

## 🌍 Internationalization

### Supported Languages
- 🇬🇧 **English**
- 🇸🇦 **Arabic** (including RTL support)

### Language Features
- Dynamic UI text switching
- System responds in user's language
- Persistent language preference

---

## 🚧 Roadmap

### Upcoming Features
- [ ] User authentication & profiles
- [ ] Medical history tracking
- [ ] Appointment scheduling
- [ ] Multi-image context support
- [ ] Export chat transcripts
- [ ] Voice input/output
- [ ] Mobile app (React Native)
- [ ] Integration with health APIs

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Steps to Contribute

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Update documentation as needed
- Test thoroughly before submitting

---

## ⚠️ Disclaimer

**Important**: This application is designed for **informational and educational purposes only**. It is **NOT a substitute for professional medical advice, diagnosis, or treatment**. 

- Always consult qualified healthcare professionals for medical concerns
- Do not rely solely on generated medical information
- In case of emergency, contact emergency services immediately

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Developed with ❤️ using cutting-edge technology**

---

## 🙏 Acknowledgments

- **Google Gemini** - For the powerful capabilities
- **React Team** - For the amazing framework
- **Tailwind Labs** - For the utility-first CSS framework
- **Three.js Team** - For 3D visualization capabilities
- **Font Awesome** - For the beautiful icons

---

## 📧 Contact & Support

For questions, suggestions, or support:

- **GitHub Issues**: [Report a bug](https://github.com/yourusername/sil-health/issues)
- **Discussions**: [Join the conversation](https://github.com/yourusername/sil-health/discussions)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with 💙

</div>
