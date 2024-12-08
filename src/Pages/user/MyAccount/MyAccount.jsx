// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const MyAccount = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login pengguna
//   const navigate = useNavigate();

//   // Cek status login saat halaman pertama kali dimuat
//   useEffect(() => {
//     const loggedInStatus = localStorage.getItem("isLoggedIn");
//     if (loggedInStatus) {
//       setIsLoggedIn(true); // Jika sudah login, set status login ke true
//     } else {
//       navigate("/login"); // Jika tidak login, arahkan ke halaman login
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn"); // Menghapus status login
//     localStorage.removeItem("role"); // Menghapus role
//     setIsLoggedIn(false); // Memperbarui state di komponen ini
//     navigate("/login"); // Arahkan ke halaman login setelah logout
//   };

//   return (
//     <div className="my-account">
//       <h1>My Account</h1>
//       {/* Konten profil pengguna di sini */}

//       {/* Tombol logout */}
//       {isLoggedIn && (
//         <div className="logout-button">
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}
//     </div>
//   );
// };

import { useNavigate } from "react-router-dom"; // Jika menggunakan react-router untuk navigasi
import { getToken, removeToken } from "../../../utils/authUtils";
import useFetchData from "../../../hook/useFeatchData";

const MyAccount = () => {
  const navigate = useNavigate(); // React Router untuk navigasi halaman
  const {data, loading, error} = useFetchData('/users/profile', getToken());


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Hapus status login
    localStorage.removeItem("role"); // Hapus role pengguna
    removeToken() // Hapus Token
    navigate("/login"); // Arahkan pengguna ke halaman login setelah logout
  };

  // Fungsi untuk menuju halaman histori
  const handleHistori = () => {
    navigate("/my-history"); // Arahkan ke halaman histori
  };

  const userData = data.data.user;

  return (
    <section className="myaccount-profil ml-60 py-8 items-center justify-center min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-bold text-2xl">Profil Akun</h1>
      </div>

      {/* Container */}
      <div className=" container mx-auto px-4">
        <div className="flex flex-wrap lg:flex-nowrap gap-8">
          {/* Profil Section */}
          <div className="lg:w-1/3">
            <div className="bg-primary-10 shadow-md rounded-lg p-6 text-center">
              <img
                src={userData.photo_profile ? userData.photo_profile : "./public/assets/images/windah.jpg"}
                alt="Profile Picture"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h2 className="text-lg text-secondary-30 font-semibold">Profi Saya</h2>
              <h4 className="text-lg text-secondary-30 font-semibold">{userData.username}</h4>
              <p className="text-secondary-30 mb-4">{userData.email}</p>

              <div className="space-x-4">
                <button
                  onClick={handleHistori}
                  className="bg-primary-20 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
                  Histori
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Detail Section */}
          <div className="lg:w-2/3">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Personal Section */}
              <div>
                <h3 className="font-bold text-lg mb-4">Personal</h3>
                <div className="mb-4">
                  <label htmlFor="nama" className="block text-sm font-medium mb-1">
                    Nama
                  </label>
                  <input type="text" id="nama" defaultValue={userData.username} className="form-input w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="tgl-lahir" className="block text-sm font-medium mb-1">
                    Tanggal Lahir
                  </label>
                  <input type="text" id="tgl-lahir" defaultValue="17 Agustus 1945" className="form-input w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="alamat" className="block text-sm font-medium mb-1">
                    Alamat
                  </label>
                  <input type="text" id="alamat" defaultValue="Jalan M.H Thamrin" className="form-input w-full" />
                </div>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="font-bold text-lg mb-4">Contact</h3>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input type="email" id="email" defaultValue={userData.email} className="form-input w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="no-hp" className="block text-sm font-medium mb-1">
                    Nomor HP
                  </label>
                  <div className="flex items-center">
                    <span className="inline-block bg-gray-200 px-3 py-2 rounded-l">+62</span>
                    <input
                      type="text"
                      id="no-hp"
                      defaultValue={userData.phone_number}
                      className="form-input w-full rounded-l-none"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="instagram" className="block text-sm font-medium mb-1">
                    Instagram
                  </label>
                  <input type="text" id="instagram" defaultValue="budiman123" className="form-input w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="twitter" className="block text-sm font-medium mb-1">
                    Twitter
                  </label>
                  <input type="text" id="twitter" defaultValue="budimanja" className="form-input w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
