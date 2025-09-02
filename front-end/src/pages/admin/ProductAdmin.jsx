import axios from "axios";
import { useEffect, useState } from "react";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios.get("http://localhost:5000/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className='w-full h-full shadow-gray-300 shadow-xl bg-white p-4 overflow-y-auto'>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="w-[1000px] border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-[10px] text-left text-gray-600 font-semibold">Image</th>
              <th className="p-[10px] text-left text-gray-600 font-semibold">ProductId</th>
              <th className="p-[10px] text-left text-gray-600 font-semibold">Name</th>
              <th className="p-[10px] text-left text-gray-600 font-semibold">Price</th>
              <th className="p-[10px] text-left text-gray-600 font-semibold">Labelled Price</th>
              <th className="p-[10px] text-left text-gray-600 font-semibold">Category</th>
              <th className="p-[10px] text-left text-gray-600 font-semibold">Stock</th>
              <th className="p-[10px] text-center text-gray-600 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-150">
                <td>
                  <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px] object-cover rounded-md border border-gray-200" />
                </td>
                <td className="p-[10px]">{product.productId}</td>
                <td className="p-[10px]">{product.name}</td>
                <td className="p-[10px]">Rs. {product.price.toLocaleString()}</td>
                <td className="p-[10px]">Rs. {product.labelledPrice.toLocaleString()}</td>
                <td className="p-[10px]">{product.category}</td>
                <td className="p-[10px]">{product.stock}</td>
                <td className="p-[10px] flex justify-center items-center gap-2">
                  <BiTrash
                    className="bg-red-500 p-[6px] text-3xl rounded-full text-white cursor-pointer hover:bg-red-600 transition"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) { navigate("/login"); return; }
                      axios.delete(`http://localhost:5000/products/${product.productId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then(() => { toast.success("Product deleted successfully"); setIsLoading(true); })
                      .catch(() => { toast.error("Failed to delete product"); });
                    }}
                  />
                  <BiEdit
                    className="bg-blue-500 p-[6px] text-3xl rounded-full text-white shadow-md cursor-pointer hover:bg-blue-600 transition"
                    onClick={() => navigate("/admin/updateProduct", { state: product })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link
        to={"/admin/newProducts"}
        className="fixed right-[30px] bottom-[30px] p-[20px] text-white bg-black rounded-full shadow-2xl hover:bg-gray-800 transition"
      >
        <BiPlus className='text-3xl'/>
      </Link>
    </div>
  );
}

export default ProductAdmin;
