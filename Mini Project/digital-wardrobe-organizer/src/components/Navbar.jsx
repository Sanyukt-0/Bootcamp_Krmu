import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Wardrobe' },
  { to: '/outfits', label: 'Outfits' },
  { to: '/collections', label: 'Collections' },
];

export default function Navbar({ itemCount }) {
  return (
    <header className="bg-ink text-canvas sticky top-0 z-20 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-wide">WARDROBE.</span>
          <span className="font-mono text-xs text-canvas/50 hidden sm:inline">{itemCount} items</span>
        </div>

        <nav className="flex gap-1 sm:gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-mono uppercase tracking-wide rounded-md transition-colors ${
                  isActive ? 'bg-canvas text-ink' : 'text-canvas/70 hover:text-canvas hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
