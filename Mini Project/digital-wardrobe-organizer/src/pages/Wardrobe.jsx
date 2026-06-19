import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ClothingCard from '../components/ClothingCard';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import StatsDashboard from '../components/StatsDashboard';
import { CATEGORIES, SEASONS, filterClothingItems, getUniqueColors } from '../utils/filters';

const emptyForm = { name: '', category: CATEGORIES[0], color: '', season: SEASONS[0], image: '' };

export default function Wardrobe() {
  const { clothingItems, outfits, addClothingItem, toggleFavoriteItem } = useOutletContext();
  const [filters, setFilters] = useState({ category: '', color: '', season: '', search: '', favoritesOnly: false });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const colors = useMemo(() => getUniqueColors(clothingItems), [clothingItems]);
  const filteredItems = useMemo(() => filterClothingItems(clothingItems, filters), [clothingItems, filters]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.color.trim()) return;
    addClothingItem(form);
    setForm(emptyForm);
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="font-display text-4xl text-ink tracking-wide">My Wardrobe</h1>
          <p className="text-ink/60 text-sm mt-1">Every piece you own, catalogued and ready to style.</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="bg-denim text-canvas px-4 py-2 rounded-md font-mono text-sm uppercase tracking-wide hover:bg-denim/90 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Item'}
        </button>
      </div>

      <StatsDashboard items={clothingItems} outfits={outfits} />

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-white border border-ink/10 rounded-xl p-4 mb-6 overflow-hidden"
          >
            <input
              required
              placeholder="Item name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input"
            />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="form-input">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              required
              placeholder="Color (e.g. Navy)"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="form-input"
            />
            <select value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })} className="form-input">
              {SEASONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <input
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="form-input"
            />
            <button
              type="submit"
              className="sm:col-span-2 lg:col-span-5 bg-ink text-canvas py-2 rounded-md font-mono text-sm uppercase tracking-wide"
            >
              Save to Wardrobe
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <SearchBar value={filters.search} onChange={(v) => setFilters({ ...filters, search: v })} />
        <FilterBar filters={filters} onChange={setFilters} colors={colors} />
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-ink/50 text-sm py-12 text-center font-mono">No pieces match these filters yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <ClothingCard key={item.id} item={item} onToggleFavorite={toggleFavoriteItem} />
          ))}
        </div>
      )}
    </div>
  );
}
