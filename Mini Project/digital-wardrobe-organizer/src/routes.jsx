import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Wardrobe from './pages/Wardrobe';
import Outfits from './pages/Outfits';
import Collections from './pages/Collections';

// App renders the Navbar + an <Outlet />, so every page below shares
// the same shell and the same lifted wardrobe state (see App.jsx).
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Wardrobe /> },
      { path: 'outfits', element: <Outfits /> },
      { path: 'collections', element: <Collections /> },
    ],
  },
]);

export default router;
