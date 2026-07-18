# AI Background Remover Application

An elegant full-stack application for removing image backgrounds using the AI remove.bg API. Built with React (Vite) on the frontend and Node/Express + MongoDB on the backend.

## Features

- **Image Upload:** Drag-and-drop or select JPG, PNG, and WebP images.
- **AI Processing:** Background removal utilizing remove.bg with fallbacks for testing.
- **Before/After Comparison:** A dynamic interactive slider to compare original and processed images side-by-side.
- **Image Downloads:** Download processed transparent PNGs in high quality.
- **History Dashboard:** Keep track of past background removals with locally stored database metadata.

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (running instance)

### Installation

1. Clone or copy the project scaffold.
2. Run the following command in the root folder to install all dependencies for both frontend and backend:
   ```bash
   npm run install:all
   ```

### Configuration

Create a `.env` file in the `backend/` directory (or copy `backend/.env.example` if available) and add your keys:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai-background-remover
REMOVE_BG_API_KEY=your_remove_bg_api_key_here
```

Create a `.env` file in the `frontend/` directory (or copy `frontend/.env.example` if available):

```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

To run both the frontend and backend in developer mode simultaneously:

```bash
npm run dev
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## Project Structure

Refer to the source files in `frontend/src` and `backend/` for full API, state context, custom hooks, and route configurations.
