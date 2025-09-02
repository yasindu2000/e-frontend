import { useState } from "react";
import { addToCart, getCart, getTotal } from "../../utils/Cart";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 px-2 md:px-4">
      {cart.map((item) => (
        <div
          key={item.productId}
          className="w-full max-w-[900px] shadow-sm flex flex-col sm:flex-row items-center relative mb-4 p-2 sm:p-0"
        >
          {/* Product Image */}
          <img
            src={item.image}
            className="w-full sm:w-[100px] h-[100px] object-cover rounded-md"
          />

          {/* Product Info */}
          <div className="w-full sm:w-[320px] flex flex-col justify-center pl-0 sm:pl-4 mt-2 sm:mt-0">
            <span className="font-bold">{item.name}</span>
            <span className="font-semibold">
              {item.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="w-full sm:w-[190px] flex flex-row justify-center items-center mt-2 sm:mt-0 gap-2">
            <button
              className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white hover:bg-blue-400"
              onClick={() => {
                addToCart(item, -1);
                setCart(getCart());
              }}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white hover:bg-blue-400"
              onClick={() => {
                addToCart(item, 1);
                setCart(getCart());
              }}
            >
              +
            </button>
          </div>

          {/* Total Price */}
          <div className="w-full sm:w-[190px] flex justify-end items-center mt-2 sm:mt-0 pr-0 sm:pr-2">
            <span className="font-semibold">
              {(item.quantity * item.price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Delete Button */}
          <button
            className="w-[30px] h-[30px] absolute top-0 right-0 sm:right-[-40px] bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-700 hover:bg-white hover:text-red-700"
            onClick={() => {
              addToCart(item, -item.quantity);
              setCart(getCart());
            }}
          >
            <TbTrash className="text-xl" />
          </button>
        </div>
      ))}

      {/* Total and Checkout */}
      <div className="w-full max-w-[800px] shadow-md flex flex-col sm:flex-row items-center justify-between p-4 mb-4">
        <span className="font-bold text-2xl">
          Total:{" "}
          {getTotal().toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <button
          className="w-full sm:w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-blue-700 border-[2px] border-blue-700 text-white mt-2 sm:mt-0 hover:bg-white hover:text-blue-700"
          onClick={() => {
            navigate("/checkout", { state: { items: cart } });
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
