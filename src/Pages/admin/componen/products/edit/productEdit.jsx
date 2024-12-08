import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchData from "../../../../../hook/useFeatchData";

const ProductEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const {data, loading, error} = useFetchData(`/vehicles/${id}`);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    stock: "",
  });
  
  
  useEffect(() => {
    setProduct({
      name: data.data.vehicles.name,
      category: data.data.vehicles.category,
      stock: data.data.vehicles.status,
    })
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  

  const handleSave = () => {
    alert(`Product ${id} saved!`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Edit Product: {product.name}</h2>
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
      <button onClick={handleSave} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
};

export default ProductEdit;
