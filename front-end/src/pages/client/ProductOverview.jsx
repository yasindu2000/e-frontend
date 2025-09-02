import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ImageSlider from "../../components/ImageSlider";
import toast from "react-hot-toast";
import { addToCart, getCart } from "../../utils/Cart";
import { useCart } from "../../context/CartContext";

function ProductOverview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  const { setCart } = useCart();

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`http://localhost:5000/products/${params.productId}`)
        .then((res) => {
          setProduct(res.data);
          setStatus("success");
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, [status]);

  return (
    <div className="w-full h-full p-4">
      {status === "loading" && <Loader />}

      {status === "success" && (
        <div className="w-full h-full flex flex-col md:flex-row gap-6">
          {/* Left side - Images */}
          <div className="w-full md:w-1/2 md:mb-20 flex justify-center items-center">
            <ImageSlider images={product.images} />
          </div>

          {/* Right side - Details */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start  pt-5">
            <h1 className="text-2xl font-bold text-center md:text-left">
              {product.name}{" "}
              <span className="font-light text-xl block md:inline">
                {product.altNames.join(" | ")}
              </span>
            </h1>

            <p className="text-lg mt-5 text-center md:text-left">
              {product.description}
            </p>

            {/* Prices */}
            <div className="w-full flex flex-col items-center md:items-start mt-5">
              {product.labelledPrice > product.price ? (
                <div>
                  <span className="text-2xl font-semibold line-through mr-4">
                    {product.labelledPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="text-3xl font-bold">
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-3xl font-bold">
                    {product.labelledPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start items-center mt-6 gap-4">
              <button
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      items: [
                        {
                          productId: product.productId,
                          quantity: 1,
                          name: product.name,
                          image: product.images[0],
                          price: product.price,
                        },
                      ],
                    },
                  });
                }}
                className="w-full sm:w-[200px] h-[50px] cursor-pointer rounded-2xl shadow-2xl text-white bg-blue-900 border-[3px] border-blue-900 hover:bg-white hover:text-blue-900"
              >
                Buy Now
              </button>
              <button
                className="w-full sm:w-[200px] h-[50px] cursor-pointer rounded-2xl shadow-2xl text-white bg-blue-600 border-[3px] border-blue-600 hover:bg-white hover:text-blue-600"
                onClick={() => {
                  addToCart(product, 1);
                  setCart(getCart());
                  toast.success("Product added to cart");
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "error" && <div className="">Error loading product</div>}
    </div>
  );
}

export default ProductOverview;
