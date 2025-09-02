import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setName(res.data.firstName + " " + res.data.lastName);
      })
      .catch(() => toast.error("Failed to fetch user details"));
  }, []);

  const [cart, setCart] = useState(location.state?.items || []);
  if (!location.state?.items) {
    toast.error("Please select items to checkout");
    navigate("/products");
  }

  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    const order = {
      address,
      phone,
      items: cart.map((item) => ({ productId: item.productId, qty: item.quantity })),
    };

    try {
      await axios.post("http://localhost:5000/orders", order, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order placed successfully");
    } catch {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 px-2 md:px-4">
      {/* Cart Items */}
      {cart.map((item, index) => (
        <div
          key={item.productId}
          className="w-full max-w-[900px] shadow-sm flex flex-col sm:flex-row items-center relative mb-4 p-2 sm:p-0"
        >
          <img
            src={item.image}
            className="w-full sm:w-[100px] h-[100px] object-cover rounded-md"
          />

          <div className="w-full sm:w-[320px] flex flex-col justify-center pl-0 sm:pl-4 mt-2 sm:mt-0">
            <span className="font-bold">{item.name}</span>
            <span className="font-semibold">
              {item.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="w-full sm:w-[190px] flex flex-row justify-center items-center mt-2 sm:mt-0 gap-2">
            <button
              className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white hover:bg-blue-400"
              onClick={() => {
                const newCart = [...cart];
                newCart[index].quantity -= 1;
                if (newCart[index].quantity <= 0) newCart.splice(index, 1);
                setCart(newCart);
              }}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white hover:bg-blue-400"
              onClick={() => {
                const newCart = [...cart];
                newCart[index].quantity += 1;
                setCart(newCart);
              }}
            >
              +
            </button>
          </div>

          <div className="w-full sm:w-[190px] flex justify-end items-center mt-2 sm:mt-0 pr-0 sm:pr-2">
            <span className="font-semibold">
              {(item.quantity * item.price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <button
            className="w-[30px] h-[30px] absolute top-0 right-0 sm:right-[-40px] bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-700 hover:bg-white hover:text-red-700"
            onClick={() => {
              const newCart = [...cart];
              newCart.splice(index, 1);
              setCart(newCart);
            }}
          >
            <TbTrash className="text-xl" />
          </button>
        </div>
      ))}

      {/* Total & Place Order */}
      <div className="w-full max-w-[800px] shadow-md flex flex-col sm:flex-row items-center justify-between p-4 mb-4">
        <span className="font-bold text-2xl">
          Total:{" "}
          {getTotal().toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <button
          className="w-full sm:w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-blue-700 border-[2px] border-blue-700 mt-2 sm:mt-0 text-white hover:bg-white hover:text-blue-700"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>

      {/* User Info Inputs */}
      <div className="w-full max-w-[800px] flex flex-col sm:flex-row flex-wrap gap-2 mb-10">
        <input
          className="flex-1 h-[40px] border border-gray-300 rounded-lg p-2"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="flex-1 h-[40px] border border-gray-300 rounded-lg p-2"
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="flex-1 h-[40px] border border-gray-300 rounded-lg p-2"
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
