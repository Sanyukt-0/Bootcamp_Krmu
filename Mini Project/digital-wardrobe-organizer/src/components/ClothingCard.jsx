// import { useState } from 'react';
// import { motion, useMotionValue, useTransform } from 'framer-motion';
// import { colorToHex, seasonStyle } from '../utils/filters';

// // Styled like a garment swing-tag (note the punched hole from custom.css)
// // and tilts in 3D toward the cursor — an Aceternity-style hover effect
// // built directly with framer-motion's motion values.
// export default function ClothingCard({ item, onToggleFavorite }) {
//   const [imgError, setImgError] = useState(false);

//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
//   const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

//   function handleMouseMove(e) {
//     const rect = e.currentTarget.getBoundingClientRect();
//     x.set((e.clientX - rect.left) / rect.width - 0.5);
//     y.set((e.clientY - rect.top) / rect.height - 0.5);
//   }

//   function handleMouseLeave() {
//     x.set(0);
//     y.set(0);
//   }

//   return (
//     <motion.div
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{ rotateX, rotateY, transformPerspective: 700 }}
//       whileHover={{ scale: 1.03 }}
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.25 }}
//       className="relative bg-white rounded-2xl border border-ink/10 shadow-sm overflow-hidden"
//     >
//       <span className="tag-hole" aria-hidden="true" />

//       <button
//         onClick={() => onToggleFavorite(item.id)}
//         aria-label={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
//         className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 border border-ink/10 flex items-center justify-center"
//       >
//         <svg
//           viewBox="0 0 24 24"
//           strokeWidth="2"
//           className={`w-4 h-4 ${item.favorite ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-ink/50'}`}
//         >
//           <path d="M12 21s-7.5-4.5-9.5-9C1 8 2.5 4.5 6 4c2-.3 4 .8 6 3 2-2.2 4-3.3 6-3 3.5.5 5 4 3.5 8-2 4.5-9.5 9-9.5 9z" />
//         </svg>
//       </button>

//       <div className="aspect-[3/4] bg-stone-100 overflow-hidden">
//         {!imgError && item.image ? (
//           <img
//             src={item.image}
//             alt={item.name}
//             onError={() => setImgError(true)}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-4xl font-display text-ink/20">
//             {item.name.charAt(0)}
//           </div>
//         )}
//       </div>

//       <div className="p-3 border-t border-dashed border-ink/15">
//         <h3 className="font-body text-sm font-semibold text-ink leading-snug">{item.name}</h3>

//         <div className="flex items-center gap-2 mt-1.5">
//           <span
//             className="w-3 h-3 rounded-full border border-ink/15"
//             style={{ backgroundColor: colorToHex(item.color) }}
//           />
//           <span className="font-mono text-[11px] text-ink/50">{item.color}</span>
//         </div>

//         <div className="flex items-center gap-1.5 mt-2">
//           <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border border-ink/15 text-ink/60">
//             {item.category}
//           </span>
//           <span className={`font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border ${seasonStyle(item.season)}`}>
//             {item.season}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { colorToHex, seasonStyle } from '../utils/filters';

// Styled like a garment swing-tag (note the punched hole from custom.css)
// and tilts in 3D toward the cursor — an Aceternity-style hover effect
// built directly with framer-motion's motion values.
export default function ClothingCard({ item, onToggleFavorite }) {
  const [imgError, setImgError] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 700 }}
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative bg-white rounded-2xl border border-ink/10 shadow-sm overflow-hidden"
    >
      <span className="tag-hole" aria-hidden="true" />

      <button
        onClick={() => onToggleFavorite(item.id)}
        aria-label={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 border border-ink/10 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 24 24"
          strokeWidth="2"
          className={`w-4 h-4 ${item.favorite ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-ink/50'}`}
        >
          <path d="M12 21s-7.5-4.5-9.5-9C1 8 2.5 4.5 6 4c2-.3 4 .8 6 3 2-2.2 4-3.3 6-3 3.5.5 5 4 3.5 8-2 4.5-9.5 9-9.5 9z" />
        </svg>
      </button>

      <div className="aspect-[3/4] bg-stone-100 overflow-hidden">
        {!imgError && item.image ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ backgroundColor: `${colorToHex(item.color)}1f` }}
          >
            <div className="flex gap-1.5">
              <span className="w-8 h-10 rounded-sm -rotate-6" style={{ backgroundColor: colorToHex(item.color) }} />
              <span className="w-8 h-10 rounded-sm" style={{ backgroundColor: colorToHex(item.color), opacity: 0.7 }} />
              <span className="w-8 h-10 rounded-sm rotate-6" style={{ backgroundColor: colorToHex(item.color), opacity: 0.45 }} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">No photo yet</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-dashed border-ink/15">
        <h3 className="font-body text-sm font-semibold text-ink leading-snug">{item.name}</h3>

        <div className="flex items-center gap-2 mt-1.5">
          <span
            className="w-3 h-3 rounded-full border border-ink/15"
            style={{ backgroundColor: colorToHex(item.color) }}
          />
          <span className="font-mono text-[11px] text-ink/50">{item.color}</span>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border border-ink/15 text-ink/60">
            {item.category}
          </span>
          <span className={`font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border ${seasonStyle(item.season)}`}>
            {item.season}
          </span>
        </div>
      </div>
    </motion.div>
  );
}