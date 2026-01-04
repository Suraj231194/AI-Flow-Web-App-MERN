# AI Flow Web App

A clean, modern MERN stack application for visualizing AI text generation with React Flow.

## Tech Stack
- **Frontend**: React, React Flow, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB
- **AI**: OpenRouter API (Mistral 7B)

## Features
- 🎨 **Visual Interface**: Drag-and-drop node editor.
- 🤖 **AI Integration**: Real-time text generation.
- 💾 **Database Connectivity**: Save your favorite flows to MongoDB.
- ⚡ **Modern UI**: Glassmorphism, toast notifications, and smooth animations.

## Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
```

## Running Locally

1. **Backend**:
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Deployment

### Vercel (Frontend & Backend)
1. Push to GitHub.
2. Import project into Vercel.
3. Set Root Directory to `client` for the frontend project.
4. Set Root Directory to `server` for the backend project.
5. Add environment variables in Vercel.

**Note**: For best results, deploy Frontend to Vercel and Backend to Render/Railway, or use Vercel Serverless functions by ensuring `vercel.json` is configured in the `server` directory.
