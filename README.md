# If You Ever Wondered

A hand-curated Instagram reel gallery built as a surprise gift for someone special. Features a cozy, cat-themed personal interface for sharing Instagram reels with personal notes attached. Viewers can browse beautifully presented reels, watch them inline via an embedded Instagram player, and react without needing an Instagram account.

## Requirements

- Node.js (v22 LTS recommended)
- Meta Developer App (for Instagram oEmbed API access)

## Setup Guide

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/insta_share.git
cd insta_share
```

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
```
Fill out the variables in `.env` based on the API instructions below.

### 3. Frontend Setup
```bash
cd client
npm install
```

## Instagram API Setup (oEmbed)

To display Instagram reels seamlessly, this app uses the Meta oEmbed API.

1. Go to [Meta for Developers](https://developers.facebook.com/).
2. Click **Create App**. Select "Other" -> "Consumer" or "Business".
3. In the app dashboard, find the **oEmbed Read** product and set it up.
4. Provide the requested details (any placeholder privacy policy URL works for local testing).
5. Go to **App Settings > Basic**. 
6. Copy the **App ID** and **App Secret** and paste them into your `server/.env` file as `META_APP_ID` and `META_APP_SECRET`.

## Running Locally

In the `server` directory, run the backend:
```bash
npm run dev
```
(Server starts on http://localhost:3000)

In the `client` directory, run the Vite frontend:
```bash
npm run dev
```
(Frontend starts on http://localhost:5173)

Open the frontend URL in your browser.

## Deployment

### Backend (Railway / Render)
Deploy the `server/` directory as a Node.js web service. Set the Build Command to `npm install` and the Start Command to `npm start`. Ensure `.env` variables are added to the platform's environment settings.

### Frontend (Vercel / Netlify)
Deploy the `client/` directory. Set the Build Command to `npm run build` and the Publish Directory to `dist`. Ensure API calls to the backend are correctly routed or proxied if necessary.
