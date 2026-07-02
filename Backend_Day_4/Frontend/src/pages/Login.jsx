// import { useState } from "react";
// import "../styles/login.css";
// import useAuth from "../hooks/useAuth";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [payload, setPayload] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const { handleLogin, loading, error } = useAuth();

//   async function handleClick(e) {
//     e.preventDefault();
//     const res = await handleLogin(payload);
//     if (res.success) {
//       navigate("/home");
//     }
//   }

//   return (
//     <div className="page">
//       <div className="left-panel">
//         <div className="brand">⬡ MyApp</div>
//         <div className="panel-text">
//           <h1>
//             Good to see
//             <br />
//             you again.
//           </h1>
//           <p>Sign in and pick up right where you left off.</p>
//         </div>
//         <div className="panel-circles">
//           <div className="circle c1" />
//           <div className="circle c2" />
//           <div className="circle c3" />
//         </div>
//       </div>

//       <div className="right-panel">
//         <div className="form-box">
//           <h2>Sign In</h2>
//           <p className="sub">Enter your credentials to continue</p>
//           {error && <h5>{error}</h5>}
//           <form onSubmit={handleClick}>
//             <div className="field">
//               <input
//                 id="email"
//                 type="email"
//                 placeholder=" "
//                 value={payload.email}
//                 onChange={(e) => {
//                   setPayload({ ...payload, email: e.target.value });
//                 }}
//               />
//               <label htmlFor="email">Email address</label>
//               <span className="field-icon">✉</span>
//             </div>

//             <div className="field">
//               <input
//                 id="password"
//                 type="password"
//                 placeholder=" "
//                 value={payload.password}
//                 onChange={(e) => {
//                   setPayload({ ...payload, password: e.target.value });
//                 }}
//               />
//               <label htmlFor="password">Password</label>
//               <span className="field-icon">🔒</span>
//             </div>

//             <div className="extras">
//               <label className="remember">
//                 <input type="checkbox" />
//                 <span>Remember me</span>
//               </label>
//               <a href="#" className="forgot">
//                 Forgot password?
//               </a>
//             </div>

//             <button type="submit" className="btn" disabled={loading}>
//               {loading ? <p className="error">{error}</p> : "Sign In"}
//             </button>
//           </form>

//             <p className="switch">
//               New here? <Link to="/register">Create an account</Link>
//             </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import "../styles/login.css";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { handleLogin, loading, error } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await handleLogin(payload);

    if (res.success) {
      navigate("/home");
    }
  }

  return (
    <div className="page">
      {/* Left Side */}
      <div className="left-panel">
        <div className="brand">🚀 MyApp</div>

        <div className="panel-text">
          <h1>Welcome Back!</h1>

          <p>
            Access your account and continue exploring everything MyApp has to
            offer.
          </p>
        </div>

        <div className="panel-circles">
          <div className="circle c1"></div>
          <div className="circle c2"></div>
          <div className="circle c3"></div>
        </div>
      </div>

      {/* Right Side */}
      <div className="right-panel">
        <div className="form-box">
          <h2>Login</h2>

          <p className="sub">
            Enter your email and password to continue.
          </p>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="email"
                id="email"
                placeholder=" "
                value={payload.email}
                onChange={(e) =>
                  setPayload({ ...payload, email: e.target.value })
                }
              />

              <label htmlFor="email">Email</label>

              <span className="field-icon">📧</span>
            </div>

            <div className="field">
              <input
                type="password"
                id="password"
                placeholder=" "
                value={payload.password}
                onChange={(e) =>
                  setPayload({ ...payload, password: e.target.value })
                }
              />

              <label htmlFor="password">Password</label>

              <span className="field-icon">🔑</span>
            </div>

            <div className="extras">
              <a href="#" className="forgot">
                Need help?
              </a>
            </div>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="switch">
            <span>Don't have an account? </span>
            <Link to="/register">Register Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}