import { useOutletContext } from 'react-router-dom';
import ClothingCard from '../components/ClothingCard';
import { SEASONS, seasonStyle } from '../utils/filters';

export default function Collections() {
  const { clothingItems, toggleFavoriteItem } = useOutletContext();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl text-ink tracking-wide">Seasonal Collections</h1>
        <p className="text-ink/60 text-sm mt-1">Your wardrobe, organized by the weather it's built for.</p>
      </div>

      {SEASONS.map((season) => {
        const items = clothingItems.filter((item) => item.season === season);
        return (
          <section key={season} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display text-2xl text-ink">{season}</h2>
              <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded border ${seasonStyle(season)}`}>
                {items.length} pieces
              </span>
              <div className="flex-1 border-t border-dashed border-ink/15" />
            </div>

            {items.length === 0 ? (
              <p className="font-mono text-xs text-ink/40">Nothing catalogued for this season yet.</p>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
                {items.map((item) => (
                  <div key={item.id} className="w-44 flex-shrink-0">
                    <ClothingCard item={item} onToggleFavorite={toggleFavoriteItem} />
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
