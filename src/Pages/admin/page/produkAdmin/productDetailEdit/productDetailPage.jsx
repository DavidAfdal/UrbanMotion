import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../../componen/Header/headerAdmin";
import ButtonCRUD from "../../../componen/button/buttonCRUD";
import useFetchData from "../../../../../hook/useFeatchData";
import axiosInstance from "../../../../../utils/axios"
import { getToken } from "../../../../../utils/authUtils";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getToken();
  const {data, loading, error} = useFetchData(`/vehicles/${id}`);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    category: "",
    stock: "",
  });
  
  
  useEffect(() => {
    if (data) {
      setProduct({
        id: data.data.vehicle.id,
        name: data.data.vehicle.name,
        category: data.data.vehicle.category,
        stock: data.data.vehicle.status,
      })
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = async(id) => {
    if (!token) {
      alert('anda belum login')
      return
    }
    
     try {
        await axiosInstance.delete(`/vehicles/${id}`,  
          {
            headers: {Authorization: `Bearer ${token}`}
          }
      );
        navigate('/admin/product')
     } catch (error) {
        alert(error.message)
     }
  }

  

  return (
    <div>
      <div className="flex-1 overflow-auto relative uppercase">
        <HeaderAdmin title={`Detail Produk  :  ${product.name}`} />
      </div>
      <main className="bg-#F5F6FA max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="flex space-x-4 mb-4 mt-4">
          <ButtonCRUD action="edit" id={product.id}/>
          <ButtonCRUD action="delete" onClick={() => handleDelete(product.id)}  />
        </div>
        <p>
          <strong>Nama:</strong> {product.name}
        </p>
        <p>
          <strong>Jenis:</strong> {product.category}
        </p>
        <p>
          <strong>Status:</strong> {product.stock}
        </p>
      </main>
    </div>
  );
};

export default ProductDetail;
