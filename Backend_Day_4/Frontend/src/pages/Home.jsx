// import useAuth from "../hooks/useAuth";
// import "../styles/home.css";

// export default function Home() {
//   const { user } = useAuth();
//   console.log(user);
  

//   return (
//     <div className="home">
//       <nav className="navbar">
//         <span className="logo">MyApp</span>
//         <div className="nav-links">
//           {user ? (
//             <>
//               <span className="nav-username">👋 {user.username || user.email}</span>
//               <button className="btn-logout">Logout</button>
//             </>
//           ) : (
//             <>
//               <a href="/login">Login</a>
//               <a href="/register" className="btn-signup">Sign Up</a>
//             </>
//           )}
//         </div>
//       </nav>

//       <section className="hero">
//         {user ? (
//           <>
//             <h1>Welcome back, {user.username || user.email} 🎉</h1>
//             <p>Good to have you here. Pick up right where you left off.</p>
//             <div className="hero-btns">
//               <a href="/dashboard" className="btn-primary">Go to Dashboard</a>
//             </div>
//           </>
//         ) : (
//           <>
//             <h1>Welcome to MyApp</h1>
//             <p>A simple and clean application for everyone.</p>
//             <div className="hero-btns">
//               <a href="/register" className="btn-primary">Get Started</a>
//               <a href="/login" className="btn-outline">Login</a>
//             </div>
//           </>
//         )}
//       </section>

//       <footer className="footer">
//         <p>© 2026 MyApp. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

import useAuth from "../hooks/useAuth";
import "../styles/home.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">MyApp</h2>

        <div className="nav-links">
          {user ? (
            <>
              <button className="btn-outline">Dashboard</button>
              <button className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register" className="btn-signup">
                Register
              </a>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        {user ? (
          <>
            <p className="welcome-text">
              👋 Hello, <strong>{user.username || user.email}</strong>
            </p>

            <h1>Your Workspace is Ready</h1>

            <p>
              Manage your account, explore new features, and continue where you
              left off.
            </p>

            <div className="hero-btns">
              <a href="/dashboard" className="btn-primary">
                Open Dashboard
              </a>

              <button className="btn-outline">
                View Profile
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="welcome-text">🚀 Welcome to MyApp</p>

            <h1>Everything You Need in One Place</h1>

            <p>
              Create an account to access personalized features and enjoy a
              smooth experience.
            </p>

            <div className="hero-btns">
              <a href="/register" className="btn-primary">
                Create Account
              </a>

              <a href="/login" className="btn-outline">
                Sign In
              </a>
            </div>
          </>
        )}
      </section>

      {/* Simple Feature Cards */}
      <section className="features">
        <div className="feature-card">
          <h3>⚡ Fast</h3>
          <p>Quick and responsive user experience.</p>
        </div>

        <div className="feature-card">
          <h3>🔒 Secure</h3>
          <p>Your information stays protected.</p>
        </div>

        <div className="feature-card">
          <h3>📱 Responsive</h3>
          <p>Looks great on desktop and mobile devices.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ | © 2026 MyApp</p>
      </footer>

    </div>
  );
}