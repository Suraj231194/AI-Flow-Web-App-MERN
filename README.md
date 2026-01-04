# ⚡ AI Flow Builder

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-v18%2B-green.svg)
![React](https://img.shields.io/badge/react-v18-informational)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

A production-ready MERN stack application that enables users to generate AI responses using a visual node-based interface. Built with **React Flow**, **Tailwind CSS**, and **OpenRouter API**.

## 🚀 Features

- **Visual Prompt Engineering**: Drag-and-drop node interface.
- **Real-time AI Generation**: Stream responses from advanced LLMs (Mistral/DeepSeek).
- **Persistent Storage**: Save your flow history to MongoDB.
- **Modern UI/UX**: Glassmorphism design, toast notifications, and responsive layout.
- **Secure Architecture**: Backend proxy to protect API keys.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React + Vite
- **Styling**: Tailwind CSS + PostCSS
- **Visualization**: Reactflow
- **Icons**: Lucide React
- **Notifications**: Sonner

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: OpenRouter API (Axios)

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- OpenRouter API Key

### 1. Clone the Repository
```bash
git clone https://github.com/Suraj231194/AI-Flow-Web-App-MERN.git
cd AI-Flow-Web-App-MERN
```

### 2. Backend Setup
```bash
cd server
npm install
# Create .env file (see below)
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai_flows
OPENROUTER_API_KEY=your_sk_key_here
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/ask-ai` | Generate text from AI model |
| `POST` | `/api/save` | Save prompt and response to DB |

## ☁️ Deployment on Vercel

This project is configured for easy deployment on Vercel.

### Option 1: Monorepo Deployment (Recommended)
You can deploy both frontend and backend as separate projects from the same repository.

**Frontend:**
1. Import repo to Vercel.
2. Set **Root Directory** to `client`.
3. Framework preset: **Vite**.
4. Add environment variable: `VITE_API_URL` = `https://your-backend-url.vercel.app/api`.

**Backend:**
1. Import repo to Vercel (again).
2. Set **Root Directory** to `server`.
3. Framework preset: **Other**.
4. Add environment variables: `MONGODB_URI` and `OPENROUTER_API_KEY`.

## 📄 License
MIT © Suraj
