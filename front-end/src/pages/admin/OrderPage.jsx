import axios from "axios";
import React, { useEffect, useState } from "react";
import Paginator from "../../components/Paginator";
import toast from "react-hot-toast";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [orderNotes, setOrderNotes] = useState("");
  const [orderStatus, setOrderStatus] = useState("pending");
  const [clickedOrder, setClickedOrder] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      axios
        .get("http://localhost:5000/orders/" + page + "/" + limit, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setOrders(res.data.orders);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loading, page, limit]);

  return (
    <div className="w-full h-full p-4 bg-gray-50 min-h-screen overflow-y-auto">
      

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="p-3 text-gray-700 font-semibold">Order ID</th>
              <th className="p-3 text-gray-700 font-semibold">Email</th>
              <th className="p-3 text-gray-700 font-semibold">Name</th>
              <th className="p-3 text-gray-700 font-semibold">Address</th>
              <th className="p-3 text-gray-700 font-semibold">Phone</th>
              <th className="p-3 text-gray-700 font-semibold">Status</th>
              <th className="p-3 text-gray-700 font-semibold">Date</th>
              <th className="p-3 text-gray-700 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b hover:bg-blue-50 cursor-pointer transition duration-150"
                onClick={() => {
                  setOrderStatus(order.status);
                  setOrderNotes(order.notes);
                  setClickedOrder(order);
                  setPopupVisible(true);
                }}
              >
                <td className="p-3">{order.orderId}</td>
                <td className="p-3">{order.email}</td>
                <td className="p-3">{order.name}</td>
                <td className="p-3">{order.address}</td>
                <td className="p-3">{order.phone}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                <td className="p-3 text-right">
                  Rs.{" "}
                  {order.total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {popupVisible && clickedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6 relative animate-fadeIn">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-50 hover:text-red-600 transition"
              onClick={() => setPopupVisible(false)}
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Order Details</h2>

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <p>
                <span className="font-semibold">Order ID:</span> {clickedOrder.orderId}
              </p>
              <p>
                <span className="font-semibold">Name:</span> {clickedOrder.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {clickedOrder.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {clickedOrder.phone}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {clickedOrder.address}
              </p>
              <p>
                <span className="font-semibold">Total:</span> Rs. {clickedOrder.total.toLocaleString()}
              </p>
            </div>

            {/* Status & Notes */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
              <div>
                <span className="font-semibold">Status:</span>
                <select
                  className="ml-2 p-1 border rounded-md"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex-1">
                <span className="font-semibold">Notes:</span>
                <textarea
                  className="w-full p-2 border rounded mt-1"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Items */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Items</h3>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {clickedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border p-3 rounded-lg shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      <p className="text-sm text-gray-500">
                        Price: Rs. {item.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm font-medium">
                        Subtotal: Rs. {(item.qty * item.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Changes Button */}
            {(orderStatus !== clickedOrder.status || orderNotes !== clickedOrder.notes) && (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                onClick={async () => {
                  setPopupVisible(false);
                  try {
                    await axios.put(
                      "http://localhost:5000/orders/" + clickedOrder.orderId,
                      { status: orderStatus, notes: orderNotes },
                      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                    );
                    toast.success("Order updated successfully");
                    setLoading(true);
                  } catch (err) {
                    console.error(err);
                    toast.error("Failed to update order");
                  }
                }}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}

      {/* Paginator */}
      <div className="mt-6">
        <Paginator
          currentPage={page}
          totalPages={totalPages}
          setCurrentPage={setPage}
          limit={limit}
          setLimit={setLimit}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}

export default OrderPage;
