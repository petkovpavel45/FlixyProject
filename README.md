# Flixy — Netflix-style Movie App

A full-featured streaming browsing app built with React and Firebase, inspired by Netflix.

**[Live Demo →](https://flixy-reacty.vercel.app)**

---

## Features

- **Netflix-style intro animation** — FLIXY sweep on first load
- **Movie trailers** — YouTube embed via TMDB API in a full modal
- **Cast & details** — Actor photos, runtime, genres, tagline, rating
- **Favourites** — Real-time sync with Firestore (add/remove from any screen)
- **Search** — Full search page with grid layout and Load More pagination
- **Genre filters** — Browse Trending, Action, Comedy, Horror, Top Rated, Upcoming
- **Auth** — Firebase email/password login + email verification
- **Toast notifications** — Non-blocking feedback for all user actions
- **Skeleton loading** — Placeholder cards while rows fetch
- **Scroll-to-top** — Floating button after 350px scroll
- **Mobile menu** — Fullscreen hamburger overlay on small screens

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

- **React** + Vite
- **Firebase Auth** — email/password authentication + email verification
- **Cloud Firestore** — real-time favourites sync
- **TMDB API** — movie data, trailers, cast, details
- **Tailwind CSS** — utility-first styling
- **React Router** — client-side routing
- **Axios** — API requests

## Getting Started

```bash
git clone https://github.com/petkovpavel45/FlixyProject
cd FlixyProject/flixy-reacty
npm install
```

Create a `.env` file in `flixy-reacty/`:

```env
VITE_TMDB_KEY=your_tmdb_api_key
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx          # Featured movie banner
│   ├── MovieRow.jsx      # Horizontally scrollable row
│   ├── MovieItem.jsx     # Individual movie card
│   ├── MovieModal.jsx    # Trailer + details overlay
│   ├── GenreGrid.jsx     # Grid view for genre filter
│   ├── IntroAnimation.jsx
│   ├── MovieSkeleton.jsx
│   ├── Navbar.jsx
│   └── ScrollToTop.jsx
├── context/
│   ├── AuthContext.jsx   # Firebase auth state
│   └── ToastContext.jsx  # Global toast notifications
├── pages/
│   ├── Home.jsx
│   ├── Search.jsx
│   ├── Profile.jsx       # Saved favourites
│   ├── Login.jsx
│   └── Signup.jsx
└── services/
    ├── firebase.js
    └── movieServices.js  # TMDB endpoints
```

## License

MIT
