import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axiosInstance from "../../../utils/axios";
import { saveToken } from "../../../utils/authUtils";
import GoogleBtn from "../../../Components/GoogleBtn/GoogleBtn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // New state for terms agreement
  const navigate = useNavigate(); // For navigation with React Router

  // Dummy data for login
  // const dummyData = [
  //   {
  //     id: 1,
  //     email: "admin@urbanmotion.com",
  //     password: "admin123", // Password for admin
  //     role: "admin",
  //   },
  //   {
  //     id: 2,
  //     email: "user@urbanmotion.com",
  //     password: "user123", // Password for user
  //     role: "user",
  //   },
  // ];

  const handleLogin = async (event) => {
    event.preventDefault();

    // Validate email, password, and terms agreement
    if (!email || !password) {
      setErrorMessage("Email dan password harus diisi.");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("Anda harus menerima syarat dan ketentuan.");
      return;
    }

    try {
      
      // Send login request
      const response = await axiosInstance.post("/auth/login", { email, password });

      // Save response data 
      const user = response.data.data.user;
      const token = response.data.data.token;

    if (user) {

      // Save login status in localStorage (so login state persists on reload)
      localStorage.setItem("isLoggedIn", true); // Store login status
      localStorage.setItem("role", user.role); // Store user role
      saveToken(token); // Store user token

      // Redirect based on user role (admin or user)
      if (user.role === "admin") {
        navigate("/admin/dashboard"); // Redirect to admin dashboard
      } else if (user.role === "user") {
        navigate("/"); // Redirect to user home page
      }
    }

    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }

  };


  // Check login status when the component first mounts
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus) {
      // If already logged in, redirect based on user role
      const userRole = localStorage.getItem("role");
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <div className="Login">
      <div className="container">
        <div className="left">
          <img alt="Webverse Studio Logo" className="logo" src="/assets/images/logo.png" />
        </div>
        <div className="right">
          <div className="login-form">
            {/* Close button */}
            <i className="fa fa-times close-icon" onClick={() => navigate("/")} title="Tutup"></i>

            <h2>Masuk</h2>
            <p>Masuk untuk mengakses akun Urban Motion anda.</p>

            {/* Form */}
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="checkbox-label">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label htmlFor="terms">Saya menerima syarat &amp; ketentuan yang berlaku</label>
              </div>

              {/* Error Message */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button type="submit" id="loginButton">
                Masuk
              </button>
            </form>

            {/* Register and Google Login */}
            <div className="register">
              <p>
                Belum punya akun? <a href="/register">Daftar</a>
              </p>
              <p>Atau</p>
              <GoogleBtn/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/login", {
//         email, // Asumsi backend menggunakan username/email
//         password,
//       });

//       const user = response.data; // Asumsi respons backend berupa data user
//       setMessage(user.message);
//       localStorage.setItem("token", user.token); // Simpan token login
//       localStorage.setItem("isLoggedIn", true);
//       localStorage.setItem("role", user.role); // Simpan role untuk pengecekan

//       // Redirect berdasarkan role
//       if (user.role === "admin") {
//         navigate("/admin/dashboard"); // Arahkan ke dashboard admin
//       } else {
//         navigate("/"); // Arahkan ke halaman utama user biasa
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.error || "Email atau password salah.");
//     }
//   };

//   useEffect(() => {
//     const loggedInStatus = localStorage.getItem("isLoggedIn");
//     const userRole = localStorage.getItem("role");

//     console.log("isLoggedIn:", loggedInStatus); // Debugging status login
//     console.log("Role:", userRole); // Debugging role yang diambil dari localStorage

//     if (loggedInStatus && userRole) {
//       if (userRole === "admin") {
//         navigate("/my-account"); // Admin
//       } else {
//         navigate("/user/home"); // User biasa
//       }
//     }
//   }, [navigate]);

//   return (
//     <div className="Login">
//       <div className="container">
//         <div className="left">
//           <img alt="Webverse Studio Logo" className="logo" src="/assets/images/logo.png" />
//         </div>
//         <div className="right">
//           <div className="login-form">
//             {/* Ikon Silang */}
//             <i className="fa fa-times close-icon" onClick={() => navigate("/")} title="Tutup"></i>

//             <h2>Masuk</h2>
//             <p>Masuk untuk mengakses akun Urban Motion Anda.</p>

//             {/* Form */}
//             <form onSubmit={handleLogin}>
//               <label htmlFor="email">Email</label>
//               <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

//               <label htmlFor="password">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               <div className="checkbox-label">
//                 <input id="terms" name="terms" type="checkbox" />
//                 <label htmlFor="terms">Saya menerima syarat &amp; ketentuan yang berlaku</label>
//               </div>

//               {/* Error Message */}
//               {errorMessage && <p className="error-message">{errorMessage}</p>}

//               <button type="submit" id="registerButton">
//                 Masuk
//               </button>
//             </form>

//             {/* Register and Google Login */}
//             <div className="register">
//               <p>
//                 Belum punya akun? <a href="/register">Daftar</a>
//               </p>
//               <p>Atau</p>
//               <a href="/dummy">
//                 <div className="google-login">
//                   <img alt="Google Logo" height="20" src="/assets/images/google.png" width="20" />
//                   <span>Masuk dengan Google</span>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
