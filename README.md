# Mystic Draw - Tarot App (React + TypeScript)

This repository contains the migrated and modernized Tarot card drawing application. This document serves as a guide for setting up and working with the new React-based structure.

## 🛠️ Quick Start

To run the application locally, follow these steps:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open the App**:
    Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

## 💻 Development Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Builds the production-ready application in the `/dist` folder. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs ESLint to check for code quality and TypeScript errors. |

## 📂 Project Organization

- **`src/App.tsx`**: The main application logic and state orchestration.
- **`src/components/`**: All UI components (Deck, Card, Modal, etc.).
- **`src/constants/tarotData.ts`**: The central data file for all 78 tarot cards and their meanings.
- **`src/hooks/useSound.ts`**: Custom hook for managing audio feedback.
- **`src/types.ts`**: Core TypeScript interfaces for card and meaning data.
- **`public/`**: Contains static assets like card images (`/Cards`) and audio files.

## 🎨 Customizing the App

- **Meanings & Advice**: Edit `src/constants/tarotData.ts` to change card descriptions or advice.
- **Styles**: Modify `src/index.css` for global styles or add CSS modules to specific components.
- **Assets**: Add new card images or sounds to the `public/` directory and update the constants accordingly.

---
&copy; 2025 [datturbomoon](https://github.com/datturbomoon). All rights reserved.
