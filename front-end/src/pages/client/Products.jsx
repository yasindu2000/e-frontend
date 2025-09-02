import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (loading) {
      if (query === "") {
        axios.get("http://localhost:5000/products").then((res) => {
          setProducts(res.data);
          setLoading(false);
        });
      } else {
        axios
          .get(`http://localhost:5000/products/search/${query}`)
          .then((res) => {
            setProducts(res.data);
            setLoading(false);
          });
      }
    }
  }, [loading]);

  return (

    <>
    <div className="w-full h-full   ">
      <div className="p-4 md:pr-20 md:pl-20">
      {/* Search Bar */}
      <div className="relative w-full sm:w-[400px] mx-auto">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLoading(true);
          }}
          className="w-full h-[45px] pl-10 pr-4 border border-gray-300 rounded-full shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-gray-300 
                     transition-all duration-300"
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                     gap-6 mt-10 place-items-center"
        >
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
      </div>
      {/* Call to Action */}
      <section className="bg-green-200 text-black mt-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
        <p className="mb-6 max-w-2xl mx-auto">Experience the best products and services with our CMart.</p>
        <Link to="/products"><button className="bg-white text-gray-500 font-semibold cursor-pointer shadow-xl py-3 px-6 rounded-full hover:bg-gray-100 transition">
          Shop Now
        </button>
        </Link>
      </section> 
    </div>
     
    </>
  );
}

export default Products;
