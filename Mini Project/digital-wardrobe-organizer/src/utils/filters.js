// Shared constants + pure helper functions for filtering and styling.
// Kept dependency-free so they're easy to unit test if this grows.

export const CATEGORIES = ['Shirts', 'Shoes', 'Accessories'];
export const SEASONS = ['Summer', 'Winter', 'Monsoon', 'Spring'];

// Tailwind class strings per season, reused on badges across
// ClothingCard, OutfitCard and the Collections page.
const SEASON_STYLES = {
  Summer: 'bg-amber-100 text-amber-800 border-amber-300',
  Winter: 'bg-sky-100 text-sky-800 border-sky-300',
  Monsoon: 'bg-teal-100 text-teal-800 border-teal-300',
  Spring: 'bg-emerald-100 text-emerald-800 border-emerald-300',
};

export function seasonStyle(season) {
  return SEASON_STYLES[season] || 'bg-stone-100 text-stone-700 border-stone-300';
}

// Rough color-name -> hex map so the swatch dot on each card has a real
// color to show, without needing a full color-picker dependency.
const COLOR_HEX = {
  black: '#1f2421',
  white: '#f8f7f4',
  navy: '#1e3a5f',
  beige: '#d8c7a1',
  olive: '#5b6b3a',
  red: '#a3322c',
  grey: '#8a8a86',
  gray: '#8a8a86',
  brown: '#6b4a33',
  'denim blue': '#4a6fa5',
  pink: '#d98a9c',
  tan: '#c8a878',
};

export function colorToHex(colorName = '') {
  const key = colorName.toLowerCase().trim();
  return COLOR_HEX[key] || '#a8a29e';
}

export function getUniqueColors(items) {
  return [...new Set(items.map((item) => item.color))];
}

export function filterClothingItems(items, { category, color, season, search, favoritesOnly }) {
  return items.filter((item) => {
    if (category && item.category !== category) return false;
    if (color && item.color !== color) return false;
    if (season && item.season !== season) return false;
    if (favoritesOnly && !item.favorite) return false;
    if (search) {
      const query = search.toLowerCase();
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesColor = item.color.toLowerCase().includes(query);
      if (!matchesName && !matchesColor) return false;
    }
    return true;
  });
}
