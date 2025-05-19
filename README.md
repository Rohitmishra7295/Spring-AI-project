# 🌐 SpringAI – Your Smart AI-Powered Assistant

SpringAI is a full-stack AI-powered web application built using **Spring Boot**, **Spring Security**, and **Spring AI (ChatGPT API)** on the backend, with **React**, **Tailwind CSS**, and **ShadCN/UI** on the frontend. It provides a seamless and secure interface for interacting with AI tools for a variety of daily-use utilities:

- 🍳 **Recipe Generator**  
- ✂️ **Text Summarizer**  
- 💬 **Chat with AI**  
- 🌍 **Live Weather (All Cities Worldwide)**  
- 🌐 **Language Translator**  

---

## 🚀 Features

### 🤖 AI Utilities
- **Recipe Generator**: Suggests recipes based on your available ingredients.
- **Text Summarizer**: Summarizes long-form content or articles.
- **AI Chat**: Friendly and responsive ChatGPT-based assistant.
- **Live Weather**: Real-time weather updates for cities across the globe.
- **Language Translator**: Translate text between any two languages.

### 🔐 Security
- **JWT-based Authentication** using Spring Security
- Secure backend APIs with role-based access

### 💻 Tech Stack

#### Backend
- **Java 17**
- **Spring Boot 3**
- **Spring Security**
- **Spring AI (ChatGPT Integration)**
- **OpenWeatherMap API**
- **Langchain / AI Model Wrappers**

#### Frontend
- **React 18 (Vite)**
- **Tailwind CSS**
- **ShadCN/UI**
- **Axios**
- **Framer Motion (for animations)**

---

## 🛠️ Getting Started

### Prerequisites

- Java 17+
- Node.js v18+
- Maven
- OpenAI API Key
- OpenWeatherMap API Key

### Backend Setup

```bash
cd springai-backend
./mvnw spring-boot:run

Ensure your application.properties contains:

openai.api.key=YOUR_OPENAI_API_KEY
weather.api.key=YOUR_OPENWEATHERMAP_API_KEY
spring.security.jwt.secret=YOUR_JWT_SECRET

Frontend Setup
cd springai-frontend
npm install
npm run dev

*****************************************************************

 Deployment Guide
🚀 Deploying SpringAI
🔹 Backend (Spring Boot) on Render
Go to Render.com

Create a new Web Service:

Connect your GitHub repo

Set environment:
JAVA_VERSION = 17
OPENAI_API_KEY = <your key>
WEATHER_API_KEY = <your key>
SPRING_SECURITY_JWT_SECRET = <your secret>

******************************

Build Command: ./mvnw clean install

Start Command: java -jar target/*.jar

******************************
🔹 Frontend (React) on Netlify
Go to Netlify.com

Connect your GitHub repo

Set build settings:

Build Command: npm run build

Publish Directory: dist/

Environment Variables (if needed):

VITE_API_BASE_URL = <your backend URL>

*******************************

🙋‍♂️ Author
Made with ❤️ by Rohit Kumar
