import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoLogOutOutline, IoPeople } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import ProductAdmin from "./admin/ProductAdmin";
import AddProductAdmin from "./admin/AddProductAdmin";
import UpdateProduct from "./admin/UpdateProduct";
import OrderPage from "./admin/OrderPage";
import UserView from "./admin/UserView";
import DashBoard from "./admin/DashBoard";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import Review from "./admin/Review";
import { MdReviews } from "react-icons/md";

function Admin() {
  const navigate = useNavigate();
  const [adminValidated, setAdminValidated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.role === "admin") {
          setAdminValidated(true);
        } else {
          toast.error("You are not authorized");
          navigate("/login");
        }
      })
      .catch(() => {
        toast.error("You are not authorized");
        navigate("/login");
      });
  }, []);

  const linkClasses = ({ isActive }) =>
    `flex flex-row h-[60px] w-full shadow-xl shadow-gray-100 p-[20px] items-center text-xl gap-[25px] ${
      isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"
    }`;

  return (
    <div className="w-full h-screen flex">
      {adminValidated ? (
        <>
          <div className="w-[300px] h-full flex flex-col items-center gap-1">
            <span className="text-3xl font-bold my-5">Admin Panel</span>

            <NavLink to="/admin/" end className={linkClasses}>
              <MdDashboard className="size-6" /> DashBoard
            </NavLink>

            <NavLink to="/admin/products" className={linkClasses}>
              <FaBoxArchive /> Products
            </NavLink>

            <NavLink to="/admin/orders" className={linkClasses}>
              <GiShoppingBag /> Orders
            </NavLink>

            <NavLink to="/admin/users" className={linkClasses}>
              <IoPeople /> Users
            </NavLink>

            <NavLink to="/admin/reviews" className={linkClasses}>
              <MdReviews /> Reviews
            </NavLink>
            
            
              {token ? (
              <button
                className="mt-15 rounded-full bg-red-500 hover:bg-white hover:border-4 shadow-sm shadow-red-600 hover:border-red-600 p-3 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  setToken(null);
                  toast.success("Logout Successful");
                  navigate("/");
                }}
              >
                <IoLogOutOutline size={25} className="text-3xl font-semibold cursor-pointer" />
              </button>
            ) : 
              
               
                 navigate("/login")}
              
            
            
          </div>
            
            
            

          <div className="w-[calc(100%-300px)] h-full">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/products" element={<ProductAdmin />} />
              <Route path="/newProducts" element={<AddProductAdmin />} />
              <Route path="/updateProduct" element={<UpdateProduct />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/users" element={<UserView />} />
              <Route path="/reviews" element={<Review />} />
            </Routes>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Admin;
