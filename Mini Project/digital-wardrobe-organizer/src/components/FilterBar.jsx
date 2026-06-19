import { CATEGORIES, SEASONS } from '../utils/filters';

export default function FilterBar({ filters, onChange, colors }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  const hasActiveFilters = filters.category || filters.season || filters.color || filters.favoritesOnly;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select value={filters.category} onChange={(e) => update('category', e.target.value)} className="form-input">
        <option value="">All categories</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={filters.season} onChange={(e) => update('season', e.target.value)} className="form-input">
        <option value="">All seasons</option>
        {SEASONS.map((season) => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
      </select>

      <select value={filters.color} onChange={(e) => update('color', e.target.value)} className="form-input">
        <option value="">All colors</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>

      <button
        onClick={() => update('favoritesOnly', !filters.favoritesOnly)}
        className={`px-3 py-2 rounded-md text-sm font-mono uppercase tracking-wide border transition-colors ${
          filters.favoritesOnly ? 'bg-rose-500 text-white border-rose-500' : 'border-ink/15 text-ink/60 bg-white'
        }`}
      >
        ♥ Favorites
      </button>

      {hasActiveFilters && (
        <button
          onClick={() => onChange({ category: '', season: '', color: '', search: filters.search, favoritesOnly: false })}
          className="text-xs font-mono underline text-ink/50 hover:text-ink"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
