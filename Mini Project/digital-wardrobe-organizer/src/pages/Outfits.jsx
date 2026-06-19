import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import OutfitCard from '../components/OutfitCard';
import { SEASONS } from '../utils/filters';

const emptyForm = { name: '', season: SEASONS[0], occasion: '', itemIds: [] };

export default function Outfits() {
  const { clothingItems, outfits, addOutfit, toggleFavoriteOutfit } = useOutletContext();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // Outfit history: newest first, optionally filtered to favorites.
  const sortedOutfits = useMemo(() => {
    const list = favoritesOnly ? outfits.filter((o) => o.favorite) : outfits;
    return [...list].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
  }, [outfits, favoritesOnly]);

  function toggleItem(id) {
    setForm((f) => ({
      ...f,
      itemIds: f.itemIds.includes(id) ? f.itemIds.filter((i) => i !== id) : [...f.itemIds, id],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || form.itemIds.length < 2) return;
    addOutfit(form);
    setForm(emptyForm);
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="font-display text-4xl text-ink tracking-wide">Outfits</h1>
          <p className="text-ink/60 text-sm mt-1">Combinations you've put together, newest first.</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="bg-denim text-canvas px-4 py-2 rounded-md font-mono text-sm uppercase tracking-wide hover:bg-denim/90 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Create Outfit'}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-white border border-ink/10 rounded-xl p-4 mb-6 overflow-hidden"
          >
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <input
                required
                placeholder="Outfit name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input"
              />
              <input
                required
                placeholder="Occasion (e.g. Casual)"
                value={form.occasion}
                onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                className="form-input"
              />
              <select value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })} className="form-input">
                {SEASONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <p className="font-mono text-[11px] uppercase text-ink/50 mb-2">Pick at least 2 pieces</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {clothingItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
                    form.itemIds.includes(item.id) ? 'bg-ink text-canvas border-ink' : 'border-ink/15 text-ink/60 bg-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button type="submit" className="bg-ink text-canvas py-2 px-4 rounded-md font-mono text-sm uppercase tracking-wide">
              Save Outfit
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/50">Outfit History</h2>
        <button
          onClick={() => setFavoritesOnly((f) => !f)}
          className={`font-mono text-xs uppercase px-3 py-1.5 rounded-full border transition-colors ${
            favoritesOnly ? 'bg-rose-500 text-white border-rose-500' : 'border-ink/15 text-ink/60 bg-white'
          }`}
        >
          ♥ Favorites only
        </button>
      </div>

      {sortedOutfits.length === 0 ? (
        <p className="text-ink/50 text-sm py-12 text-center font-mono">No outfits logged yet — put one together above.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedOutfits.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} items={clothingItems} onToggleFavorite={toggleFavoriteOutfit} />
          ))}
        </div>
      )}
    </div>
  );
}
