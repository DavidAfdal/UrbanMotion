import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file
import axiosInstance from "../../../utils/axios";
import GoogleBtn from "../../../Components/GoogleBtn/GoogleBtn";

const Register = () => {
  const navigate = useNavigate(); // Use navigate from React Router

  // State to track form values
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    nohp: "",
    password: "",
    terms: false,
  });

  // State to handle error messages
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Nama pengguna wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (!formData.nohp) newErrors.nohp = "Nomor handphone wajib diisi";
    if (!formData.password) newErrors.password = "Password wajib diisi";
    if (!formData.terms) newErrors.terms = "Anda harus menyetujui syarat dan ketentuan";

    return newErrors;
  };

  // Handle form submission
  const handleRegister = async (event) => {
    event.preventDefault();

    // Validate the form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // If there are errors, don't proceed
    }

    try {
      
      const registerRequestData = {
        username: formData.username,
        email: formData.email,
        phone_number: formData.nohp,
        password: formData.password,
      };

      // Make API call to register user
      const response = await axiosInstance.post("/auth/register", registerRequestData);
      console.log(response);

      

      // Handle success response
      document.getElementById("popupOverlay").style.display = "block";
      document.getElementById("successPopup").style.display = "block";

      // Clear form data and errors
      setFormData({
        username: "",
        email: "",
        nohp: "",
        password: "",
        terms: false,
      });


    } catch (error) {
      // Handle error response
      console.error(error);
      setErrors((prevState) => ({
        ...prevState,
        apiError: "Terjadi kesalahan saat mendaftar.",
      }))
    }

    // If no errors, show the success popup
  
  };

  // Close the success popup and navigate to the login page
  const closePopup = () => {
    navigate("/login"); // Navigate to login page when close popup is clicked
  };

  // Close the modal and navigate to the home page
  const closeModal = () => {
    navigate("/"); // Navigate to home page when close 'x' is clicked
  };

  return (
    <div className="register">
      <div className="container">
        <div className="left">
          <img alt="Webverse Studio Logo" height="200" src="/assets/images/logo.png" width="600" className="logo" />
        </div>
        <div className="right">
          <div className="login-form">
            {/* Close button with onClick */}
            <i className="fa fa-times close-icon" onClick={closeModal} title="Tutup"></i>
            <h2>Daftar</h2>
            <p>Daftar untuk mengakses akun Urban Motion anda.</p>

            <label htmlFor="username">Nama Pengguna</label>
            <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} />
            {errors.username && <span className="error">{errors.username}</span>}

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}

            <label htmlFor="nohp">Nomor handphone</label>
            <input id="nohp" name="nohp" type="text" value={formData.nohp} onChange={handleChange} />
            {errors.nohp && <span className="error">{errors.nohp}</span>}

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}

            <div className="checkbox-label">
              <input id="terms" name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} />
              <label htmlFor="terms">Saya menerima syarat &amp; ketentuan yang berlaku</label>
            </div>
            {errors.terms && <span className="error">{errors.terms}</span>}

            <button type="submit" id="registerButton" onClick={handleRegister}>
              Daftar
            </button>
            <div className="register">
              <p>
                Sudah punya akun? <a href="/login">Masuk</a>
              </p>
              <p>Atau</p>
              <a href="/dummy">
                <GoogleBtn/>
              </a>
            </div>
          </div>
        </div>

        {/* Pop-up */}
        <div className="popup-overlay" id="popupOverlay"></div>
        <div className="popup" id="successPopup">
          <img src="/assets/images/daftarBerhasil.png" alt="Gambar Berhasil Daftar" />
          <button id="closePopup" onClick={closePopup}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Pastikan Anda menggunakan hook useNavigate untuk navigasi
// import "./Register.css"; // Import the CSS file

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [nohp, setNohp] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // Hook untuk navigasi halaman

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/register",
//         {
//           username,
//           email,
//           nohp,
//           password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setMessage(response.data.message);
//       // Menampilkan popup setelah berhasil daftar
//       document.getElementById("popupOverlay").style.display = "block";
//       document.getElementById("successPopup").style.display = "block";
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Registration failed");
//     }
//   };

//   const closePopup = () => {
//     // Navigasi ke halaman login setelah menutup popup
//     navigate("/login");
//   };

//   return (
//     <div className="register">
//       <div className="container">
//         <div className="left">
//           <img alt="Webverse Studio Logo" height="200" src="/assets/images/logo.png" width="600" className="logo" />
//         </div>
//         <div className="right">
//           <div className="login-form">
//             <i className="fa fa-times close-icon" onClick={() => navigate("/")} title="Tutup"></i>
//             <h2>Daftar</h2>
//             <p>Daftar untuk mengakses akun Urban Motion Anda.</p>
//             <label htmlFor="username">Nama Pengguna</label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <label htmlFor="email">Email</label>
//             <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <label htmlFor="nohp">Nomor Handphone</label>
//             <input id="nohp" name="nohp" type="text" value={nohp} onChange={(e) => setNohp(e.target.value)} />
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <div className="checkbox-label">
//               <input id="terms" name="terms" type="checkbox" />
//               <label htmlFor="terms">Saya menerima syarat &amp; ketentuan yang berlaku</label>
//             </div>

//             <button type="submit" id="registerButton" onClick={handleRegister}>
//               Daftar
//             </button>
//             <div className="register">
//               <p>
//                 Sudah punya akun? <a href="/login">Masuk</a>
//               </p>
//               <p>Atau</p>
//               <a href="/dummy">
//                 <div className="google-login">
//                   <img alt="Google Logo" height="20" src="/assets/images/google.png" width="20" />
//                   <span>Daftar dengan Google</span>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Pop-up */}
//         <div className="popup-overlay" id="popupOverlay"></div>
//         <div className="popup" id="successPopup">
//           <img src="/assets/images/daftarBerhasil.png" alt="Gambar Berhasil Daftar" />
//           <button id="closePopup" onClick={closePopup}>
//             Tutup
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
