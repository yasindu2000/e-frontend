import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products (first 6 products for home page)
  useEffect(() => {
    axios.get("https://e-backend-2-r0ho.onrender.com/products").then((res) => {
      setProducts(res.data.slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-200 text-black py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Our Shop
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Discover top-quality products at amazing prices. Shop today and enjoy fast delivery and excellent customer service.
        </p>
        <Link to="/products"><button  className="bg-white text-gray-500 font-semibold cursor-pointer shadow-xl py-3 px-6 rounded-full hover:bg-gray-100 transition">
          Shop Now
        </button>
        </Link>
      </section>

      {/* Featured Products */}
      <section className="py-16 pl-10  max-w-6xl mx-auto">
        <h2 className="text-3xl mr-8 font-semibold text-gray-800 mb-8 text-center">
          Featured Products
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categories / Offers Section */}
      <section className="py-16 px-4 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-blue-100 p-6 rounded-xl text-center hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Face Creams</h3>
            <p className="text-gray-700">Night And Day Creams</p>
          </div>
          <div className="bg-green-100 p-6 rounded-xl text-center hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Fash Wash</h3>
            <p className="text-gray-700">High Quality Fash Washes</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-xl text-center hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Facial Accessories</h3>
            <p className="text-gray-700">Emported Quality Accessories</p>
          </div>
          <div className="bg-pink-100 p-6 rounded-xl text-center hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Beauty</h3>
            <p className="text-gray-700">Skincare and cosmetics</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center bg-green-200 text-black">
        <h2 className="text-3xl font-bold mb-4">Start Shopping Today!</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Explore our wide range of products and enjoy amazing deals.
        </p>
        <button className="bg-white text-gray-500 font-semibold cursor-pointer shadow-xl py-3 px-6 rounded-full hover:bg-gray-100 transition">
          Browse Products
        </button>
      </section>
    </div>
  );
}

export default HomePage;
