// Pure function that turns raw item/outfit arrays into the numbers
// StatsDashboard displays. Kept separate from the component so it's
// easy to test or reuse (e.g. on a future "insights" page).

export function computeWardrobeStats(items, outfits) {
  const totalItems = items.length;
  const totalOutfits = outfits.length;
  const favoriteItems = items.filter((item) => item.favorite).length;

  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const seasonCounts = items.reduce((acc, item) => {
    acc[item.season] = (acc[item.season] || 0) + 1;
    return acc;
  }, {});

  const topCategoryEntry = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];
  const topSeasonEntry = Object.entries(seasonCounts).sort((a, b) => b[1] - a[1])[0];

  return {
    totalItems,
    totalOutfits,
    favoriteItems,
    categoryCounts,
    seasonCounts,
    topCategory: topCategoryEntry ? topCategoryEntry[0] : '—',
    topSeason: topSeasonEntry ? topSeasonEntry[0] : '—',
  };
}
