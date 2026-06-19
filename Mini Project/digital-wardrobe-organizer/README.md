# Digital Wardrobe Organizer

A mini React project for cataloguing clothes, building outfits, and browsing
your wardrobe by season — built with Vite, React Router and Tailwind CSS,
with a card-tilt hover effect in the Aceternity UI style (via Framer Motion).

## Features

- Add clothing items with name, category, color, season and an optional image
- Browse the full wardrobe in a responsive product-gallery grid
- Search by name/color and filter by category, color, season or favorites
- Mark any item or outfit as a favorite
- Build outfit combinations from existing items and view an outfit history, newest first
- Browse seasonal collections (Summer / Winter / Monsoon / Spring) as horizontally scrolling lookbook sections
- A small stats dashboard (total items, outfits logged, favorites, top category)
- Data persists to the browser's localStorage, so it survives a page refresh

## Tech stack

- React 18 + Vite
- React Router v6 (`createBrowserRouter` + `<Outlet>` for shared state)
- Tailwind CSS for styling
- Framer Motion for the 3D card-tilt hover effect and form transitions

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
├── components/      Reusable UI: Navbar, ClothingCard, OutfitCard, FilterBar, SearchBar, StatsDashboard
├── pages/            Wardrobe, Outfits, Collections — one per route
├── data/             wardrobeData.js — demo seed data
├── utils/            filters.js (constants + filtering) and statistics.js (stat calculations)
├── styles/           custom.css — Tailwind layers + the signature "swing-tag" detail
├── App.jsx           Root layout: Navbar + shared state, passed to pages via Outlet context
├── routes.jsx        Route definitions for Wardrobe / Outfits / Collections
└── main.jsx          App entry point
```

## Adding your own images

Drop image files into `public/images/shirts`, `public/images/shoes` or
`public/images/accessories`, then point an item's `image` field (in
`wardrobeData.js`, or in the "Add Item" form) at `/images/<folder>/<file>.jpg`.
If an image is missing or fails to load, the card falls back to a simple
monogram tile, so the app never breaks on a missing photo.

## Notes for extending this

- State is lifted into `App.jsx` and shared with every page through React
  Router's `useOutletContext()` — no separate context file was needed at
  this scale, but that's where you'd introduce one if the app grew.
- `filters.js` and `statistics.js` are plain functions with no React
  dependencies, so they're easy to unit test if you add a test runner later.
