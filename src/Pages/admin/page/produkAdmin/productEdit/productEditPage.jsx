import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderAdmin from "../../../componen/Header/headerAdmin";
import ButtonCRUD from "../../../componen/button/buttonCRUD";
import useFetchData from "../../../../../hook/useFeatchData";

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {data, loading, error} = useFetchData(`/vehicles/${id}`);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    stock: "",
  });
  
  
  useEffect(() => {
    if (data) {
      setProduct({
        name: data.data.vehicle.name,
        category: data.data.vehicle.category,
        stock: data.data.vehicle.status,
      })
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSave = () => {
    alert(`Product ${id} saved!`);
  };

  return (
    <div>
      <div className="flex-1 overflow-auto relative uppercase">
        <HeaderAdmin title={`Edit Produk  :  ${product.name}`} />
      </div>
      <main className="bg-#F5F6FA max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div>
          <label className="block">Nama:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="border p-2 rounded mt-2"
          />
        </div>
        <div>
          <label className="block">Kategori:</label>
          <input
            type="text"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            className="border p-2 rounded mt-2"
          />
        </div>
        <div>
          <label className="block">Status:</label>
          <input
            type="text"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            className="border p-2 rounded mt-2"
          />
        </div>
        <div className="mt-5">
          {/* <button onClick={handleSave} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Save
      </button> */}
          <ButtonCRUD action="save" onClick={handleSave} />
        </div>
      </main>
    </div>
  );
};

export default ProductEditPage;
