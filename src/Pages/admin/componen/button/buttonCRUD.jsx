import { PlusCircle, Edit, Trash, Save } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate dari react-router-dom

// Komponen ButtonCRUD untuk aksi CRUD
const ButtonCRUD = ({ action, onClick, id = "" }) => {
  const navigate = useNavigate(); // Hook untuk navigasi

  let buttonText = "";
  let Icon = null;
  let buttonClass = "";
  let destination = ""; // Variabel untuk menyimpan link tujuan

  // Menentukan ikon, teks tombol, warna tombol, dan link tujuan berdasarkan aksi
  switch (action) {
    case "add":
      buttonText = "Add";
      Icon = PlusCircle;
      buttonClass = "bg-primary-10"; // Hijau untuk tambah
      destination = "/admin/product/add"; // Halaman untuk menambahkan produk
      break;

    case "edit":
      buttonText = "Edit";
      Icon = Edit;
      buttonClass = "bg-blue-500 hover:bg-blue-600"; // Biru untuk edit
      destination = `/admin/product-edit/${id}`; // Halaman untuk mengedit produk
      break;

    case "delete":
      buttonText = "Delete";
      Icon = Trash;
      buttonClass = "bg-red-500 hover:bg-red-600"; // Merah untuk hapus
      break;

    case "save":
      buttonText = "Save";
      Icon = Save;
      buttonClass = "bg-yellow-500 hover:bg-yellow-600"; // Kuning untuk simpan
      break;

    case "create":
      buttonText = "Create Product";
      Icon = PlusCircle;
      buttonClass = "bg-blue-500 hover:bg-blue-600 "; // Biru untuk Create
      break;

    default:
      return null;
  }

  // Fungsi untuk mengarahkan pengguna ke halaman tujuan
  const handleClick = () => {
    if (onClick) {
      onClick(); // Memanggil fungsi onClick jika ada
    } else if (destination) {
      navigate(destination); // Jika tidak ada onClick, lakukan navigasi otomatis
    }
  };

  return (
    <button
      onClick={handleClick} // Menangani klik untuk navigasi atau onClick khusus
      className={`flex items-center space-x-2 px-4 py-2 text-sm text-white rounded-md focus:outline-none ${buttonClass}`}>
      <Icon size={16} />
      <span>{buttonText}</span>
    </button>
  );
};

export default ButtonCRUD;
