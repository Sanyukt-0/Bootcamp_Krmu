import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { clothingItems as seedItems, outfits as seedOutfits } from './data/wardrobeData';

const ITEMS_KEY = 'wardrobe.items';
const OUTFITS_KEY = 'wardrobe.outfits';

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  // All wardrobe state lives here and is handed down to every page via
  // the router's Outlet context — no extra context file needed for a
  // project this size.
  const [clothingItems, setClothingItems] = useState(() => loadFromStorage(ITEMS_KEY, seedItems));
  const [outfits, setOutfits] = useState(() => loadFromStorage(OUTFITS_KEY, seedOutfits));

  useEffect(() => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(clothingItems));
  }, [clothingItems]);

  useEffect(() => {
    localStorage.setItem(OUTFITS_KEY, JSON.stringify(outfits));
  }, [outfits]);

  function addClothingItem(item) {
    setClothingItems((prev) => [
      { ...item, id: crypto.randomUUID(), favorite: false, dateAdded: new Date().toISOString() },
      ...prev,
    ]);
  }

  function toggleFavoriteItem(id) {
    setClothingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item))
    );
  }

  function addOutfit(outfit) {
    setOutfits((prev) => [
      { ...outfit, id: crypto.randomUUID(), favorite: false, dateCreated: new Date().toISOString() },
      ...prev,
    ]);
  }

  function toggleFavoriteOutfit(id) {
    setOutfits((prev) =>
      prev.map((outfit) => (outfit.id === id ? { ...outfit, favorite: !outfit.favorite } : outfit))
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink font-body">
      <Navbar itemCount={clothingItems.length} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Outlet
          context={{
            clothingItems,
            outfits,
            addClothingItem,
            toggleFavoriteItem,
            addOutfit,
            toggleFavoriteOutfit,
          }}
        />
      </main>
    </div>
  );
}
