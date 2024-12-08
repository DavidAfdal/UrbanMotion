import { motion } from "framer-motion";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi

// const PRODUCT_DATA = [
//   { id: 1, name: "Brio 1", category: "Mobil", stock: "ready" },
//   { id: 2, name: "Brio 2", category: "Mobil", stock: "ready" },
//   { id: 3, name: "Brio 3", category: "Mobil", stock: "ready" },
//   { id: 4, name: "Brio 4", category: "Mobil", stock: "ready" },
//   { id: 5, name: "Brio 5", category: "Mobil", stock: "booked" },
// ];

const ProductsTable = ({vehicles}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(vehicles);


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = vehicles.filter(
      (product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };


  return (
    <motion.div
      className="bg-white  backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary-10">Product List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-white text-primary-10 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-grey mb-4"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-10 uppercase tracking-wider"># id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-10 uppercase tracking-wider">
                Nama Kendaraan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-10 uppercase tracking-wider">
                jenis kendaraan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-10 uppercase tracking-wider">
                status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-10 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
          {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}>
                <td className=" pointer px-6 py-4 whitespace-nowrap text-sm  text-primary-10 flex gap-2 items-center">
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-10 ">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-10 ">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-10  uppercase ">{product.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-10 ">
                  {/* Kontainer dengan class 'flex' dan 'space-x-2' untuk ikon horizontal */}
                  <div className="flex space-x-3">
                    {/* Link ke halaman View Product */}
                    <Link
                      to={`/admin/product-detail/${product.id}`}
                      className="text-indigo-400 hover:text-indigo-300 cursor-pointer">
                      <Eye size={18} />
                    </Link>

                    {/* Link ke halaman Edit Product */}
                    <Link
                      to={`/admin/product-edit/${product.id}`}
                      className="text-indigo-400 hover:text-indigo-300 cursor-pointer">
                      <Edit size={18} />
                    </Link>

                    {/* Link ke halaman Delete Product */}
                    <Link
                      to={`/admin/product-delete/${product.id}`}
                      className="text-red-400 hover:text-red-300 cursor-pointer">
                      <Trash2 size={18} />
                    </Link>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default ProductsTable;



