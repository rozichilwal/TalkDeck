# TalkDeck 💬

Hey! 👋 Welcome to TalkDeck, a full-stack real-time communication platform (heavily inspired by Slack). I built this to explore how to create a scalable, modern chat and video conferencing application from the ground up.

## What is TalkDeck?
TalkDeck lets you create workspaces, channels, and direct messages to collaborate with your team seamlessly. 
- **Real-time Chat & Video:** Powered by Stream, allowing for instant messaging, file sharing, and high-quality video calls.
- **Authentication:** Secure, passwordless, and social login experiences handled safely by Clerk.
- **Background Jobs:** Uses Inngest to reliably handle background tasks and event-driven workflows.
- **Error Tracking:** Fully integrated with Sentry on both the frontend and backend so I can squash bugs before they ruin the experience.

## Tech Stack
The project is divided into a frontend and backend, using a modern JS ecosystem:

### Frontend
- **Framework:** React 19 powered by Vite for incredibly fast builds.
- **Styling:** Tailwind CSS (v4) for rapid, responsive UI development.
- **State & Data Fetching:** React Query for managing server state and caching smoothly.
- **Auth & Communication:** `@clerk/clerk-react` and Stream's robust React SDKs (`stream-chat-react`, `@stream-io/video-react-sdk`).

### Backend
- **Server:** Node.js with Express.
- **Database:** MongoDB & Mongoose for storing user profiles and workspace metadata.
- **Auth:** `@clerk/express` for protecting API routes.
- **Services:** `stream-chat` (for server-side token generation and webhooks) and `inngest` for queueing background jobs.

## Running It Locally

Want to test it out? Here is how to get it running on your local machine:

### 1. Clone the repo
```bash
git clone https://github.com/rozichilwal/TalkDeck.git
cd TalkDeck
```

### 2. Set up the Backend
```bash
cd backend
npm install
```
You'll need a `.env` file in the `backend` directory. Go ahead and create one with your API keys (you'll need accounts for Clerk, Stream, MongoDB, Inngest, and Sentry):
```env
# Example Backend .env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
INNGEST_EVENT_KEY=your_inngest_key
SENTRY_DSN=your_sentry_dsn
```
Start the backend development server:
```bash
npm run dev
```

### 3. Set up the Frontend
Open up a new terminal tab and navigate to the frontend folder:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory for your public keys:
```env
# Example Frontend .env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_API_KEY=your_stream_api_key
VITE_SENTRY_DSN=your_sentry_dsn
```
Start the frontend development server:
```bash
npm run dev
```

The app should now be running! The Vite frontend typically starts on `http://localhost:5173`.

---
Feel free to explore the code, report any bugs, or open a pull request!
