import { computeWardrobeStats } from '../utils/statistics';

export default function StatsDashboard({ items, outfits }) {
  const stats = computeWardrobeStats(items, outfits);

  const tiles = [
    { label: 'Total Items', value: stats.totalItems },
    { label: 'Outfits Logged', value: stats.totalOutfits },
    { label: 'Favorites', value: stats.favoriteItems },
    { label: 'Top Category', value: stats.topCategory },
  ];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {tiles.map((tile) => (
        <div key={tile.label} className="bg-white/70 border border-ink/10 rounded-xl px-4 py-3">
          <div className="font-display text-3xl text-ink">{tile.value}</div>
          <div className="font-mono text-[11px] uppercase tracking-wide text-ink/50 mt-1">{tile.label}</div>
        </div>
      ))}
    </section>
  );
}
