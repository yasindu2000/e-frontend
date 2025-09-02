import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";

function DashBoard() {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [productCount, setProductCount] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    // Get user count
    axios
      .get("http://localhost:5000/users/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUserCount(res.data.length);
        setLoadingUsers(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingUsers(false);
      });

    // Get order count from totalOrders in your existing API
    axios
      .get("http://localhost:5000/orders/1/50", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
          console.log("Orders API response:", res.data);
        setOrderCount(res.data.orders.length|| 0); // backend gives totalOrders
        setLoadingOrders(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingOrders(false);
      });

    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProductCount(res.data.length);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingProducts(false);
      });
  }, []);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Count Card */}
        <div className="bg-blue-100 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
          {loadingUsers ? (
            <Loader />
          ) : (
            <p className="text-3xl font-bold text-blue-600 mt-2">{userCount}</p>
          )}
        </div>

        {/* Order Count Card */}
        <div className="bg-green-100 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : (
            <p className="text-3xl font-bold text-green-600 mt-2">
              {orderCount}
            </p>
          )}
        </div>

        <div className="bg-pink-100 shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Products
          </h2>
          {loadingProducts ? (
            <div className="mt-2">
              <Loader />
            </div>
          ) : (
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {productCount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
