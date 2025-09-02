import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = () => {
    axios
      .get("https://e-backend-2-r0ho.onrender.com/users/all") // call backend API
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`https://e-backend-2-r0ho.onrender.com/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast.success("User deleted successfully");
          fetchUsers(); // refresh list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete user");
        });
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-lg font-semibold">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full p-6 overflow-y-auto">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Email Verified</th>
              <th className="px-4 py-2">Action</th> {/* new column */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={user.image}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border"
                  />
                </td>
                <td className="px-4 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone || "N/A"}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  {user.isBlocked ? (
                    <span className="bg-red-200 text-red-600 px-2 py-1 rounded text-xs">
                      Blocked
                    </span>
                  ) : (
                    <span className="bg-green-200 text-green-600 px-2 py-1 rounded text-xs">
                      Active
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {user.isEmailVerified ? "✅" : "❌"}
                </td>
                <td className="px-4 py-2">
                  <BiTrash
                    className="bg-red-500 p-[6px] text-3xl rounded-full text-white cursor-pointer hover:bg-red-600 transition"
                    onClick={() => handleDelete(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserView;
