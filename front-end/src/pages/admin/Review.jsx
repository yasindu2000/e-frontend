import { useEffect, useState } from "react";
import axios from "axios";
import { BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

function AdminReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get("https://e-backend-2-r0ho.onrender.com/reviews", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  // Delete review
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`https://e-backend-2-r0ho.onrender.com/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReviews(reviews.filter((review) => review._id !== id));
      toast.success("Review delet Success");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <Loader/>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Comment</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td className="border p-2">{review.name}</td>
                <td className="border p-2">{review.comment}</td>
                <td className="border p-2">{review.rating}</td>
                <td className="border p-2">{review.userEmail}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className=" text-red-600 cursor-pointer"
                  >
                    <BiTrash className="bg-red-500 p-[6px] text-3xl rounded-full text-white cursor-pointer hover:bg-red-600 transition" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminReview;
