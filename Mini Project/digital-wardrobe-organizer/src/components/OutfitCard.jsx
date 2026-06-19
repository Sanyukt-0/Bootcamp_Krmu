import { motion } from 'framer-motion';
import { seasonStyle } from '../utils/filters';

export default function OutfitCard({ outfit, items, onToggleFavorite }) {
  const outfitItems = items.filter((item) => outfit.itemIds.includes(item.id));
  const createdLabel = new Date(outfit.dateCreated).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative bg-white rounded-2xl border border-ink/10 shadow-sm p-4"
    >
      <button
        onClick={() => onToggleFavorite(outfit.id)}
        aria-label={outfit.favorite ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-canvas border border-ink/10 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 24 24"
          strokeWidth="2"
          className={`w-4 h-4 ${outfit.favorite ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-ink/50'}`}
        >
          <path d="M12 21s-7.5-4.5-9.5-9C1 8 2.5 4.5 6 4c2-.3 4 .8 6 3 2-2.2 4-3.3 6-3 3.5.5 5 4 3.5 8-2 4.5-9.5 9-9.5 9z" />
        </svg>
      </button>

      {/* Mini collage of the garments in this outfit */}
      <div className="flex gap-2 mb-3">
        {outfitItems.slice(0, 4).map((item) => (
          <div key={item.id} className="w-14 h-16 rounded-lg bg-stone-100 overflow-hidden border border-ink/10">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
          </div>
        ))}
      </div>

      <h3 className="font-display text-lg tracking-wide text-ink pr-8">{outfit.name}</h3>
      <p className="font-mono text-[11px] text-ink/50 mt-0.5">
        {outfit.occasion} · {createdLabel}
      </p>
      <span className={`inline-block mt-2 font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border ${seasonStyle(outfit.season)}`}>
        {outfit.season}
      </span>
    </motion.div>
  );
}
