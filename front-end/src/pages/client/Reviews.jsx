import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineStar } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import Loader from "../../components/Loader";

function Reviews() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const navigate = useNavigate();

  const [editingReview, setEditingReview] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [updatedRating, setUpdatedRating] = useState(5);
  const [loading, setLoading] = useState(true);

 
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Get current user info from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setCurrentUserEmail(decoded.email);
      }
    }
  }, []);

  useEffect(() => {
    if (loading) {
      axios
        .get("https://e-backend-2-r0ho.onrender.com/reviews")
        .then((res) => {
          setReviews(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching reviews", err);
          toast.error("Failed to fetch reviews");
          setLoading(false);
        });
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login First");
      navigate("/login");
      return;
    }

    const reviewData = {
      name: name,
      comment: comment,
      rating: rating,
    };

    await axios
      .post("https://e-backend-2-r0ho.onrender.com/reviews", reviewData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Review Added Successfully");
        setLoading(true); // Refresh reviews
        setName("");
        setComment("");
        setRating(5);
      })
      .catch((error) => {
        console.error("Error adding review", error);
        if (error.response?.status === 401) {
          toast.error("Please login first");
          navigate("/login");
        } else {
          toast.error(error.response?.data?.message || "Failed to add review");
        }
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    axios
      .delete(`https://e-backend-2-r0ho.onrender.com/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Review deleted successfully");
        setReviews(reviews.filter((review) => review._id !== id));
      })
      .catch((error) => {
        console.error("Delete error:", error);
        if (error.response?.status === 403) {
          toast.error("You can only delete your own reviews");
        } else if (error.response?.status === 401) {
          toast.error("Please login first");
          navigate("/login");
        } else {
          toast.error("Failed to delete review");
        }
      });
  };

  const handleEdit = (review) => {
    setEditingReview(review._id);
    setUpdatedComment(review.comment);
    setUpdatedRating(review.rating);
  };

  const handleUpdate = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    axios
      .put(
        `https://e-backend-2-r0ho.onrender.com/reviews/${id}`,
        { comment: updatedComment, rating: updatedRating },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("Review updated successfully");
        setEditingReview(null);
        setLoading(true); // Refresh reviews
      })
      .catch((error) => {
        console.error("Update error:", error);
        if (error.response?.status === 403) {
          toast.error("You can only update your own reviews");
        } else if (error.response?.status === 401) {
          toast.error("Please login first");
          navigate("/login");
        } else {
          toast.error("Failed to update review");
        }
      });
  };

  // Function to check if current user owns the review
  const canModifyReview = (review) => {
    return currentUserEmail && review.userEmail === currentUserEmail;
  };

  return (
    <div className="h-full">
      {/* Page Title */}
      <div className="p-4 md:p-2">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Place Your Review
        </h1>

        {/* Review Form */}
        <div className="bg-white border-gray-200 shadow-md rounded-2xl p-6 mb-10 max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-gray-200 shadow-sm shadow-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="border-gray-200 shadow-sm shadow-gray-300 rounded-xl px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-gray-300"
            ></textarea>

            {/* Rating Selector */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-500">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border border-gray-400 text-gray-600 rounded-lg px-2 py-1 focus:outline-none"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option className="text-gray-600" key={r} value={r}>
                    {r} Star{r > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition duration-300"
            >
              Add Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="flex justify-center items-center col-span-full">
              <Loader />
            </div>
          ) : (
            reviews.map((review, index) => (
              <div
                key={index}
                className="shadow-md rounded-xl p-4 flex flex-col gap-2 bg-white"
              >
                <div className="flex text-yellow-400">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <MdOutlineStar key={i} className="size-5" />
                  ))}
                </div>

                {editingReview === review._id ? (
                  <>
                    <textarea
                      value={updatedComment}
                      onChange={(e) => setUpdatedComment(e.target.value)}
                      className="border-gray-300 border outline-0 rounded-xl px-2 py-1"
                    ></textarea>
                    <select
                      value={updatedRating}
                      onChange={(e) => setUpdatedRating(e.target.value)}
                      className="border-gray-400 border outline-0 rounded-lg px-2 py-1"
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>
                          {r} Stars
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(review._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded-xl mt-2 cursor-pointer flex-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingReview(null)}
                        className="bg-gray-400 text-white cursor-pointer px-2 py-1 rounded-xl mt-2 flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {review.name}
                    </h2>
                    <p className="text-gray-600">{review.comment}</p>
                    
                    {/* Show edit/delete buttons only for the review owner */}
                    {canModifyReview(review) && (
                      <div className="flex gap-4 mt-2">
                        <button
                          className="bg-gray-200 text-white rounded-full py-1 px-1 text-xl"
                          onClick={() => handleEdit(review)}
                        >
                          <MdModeEditOutline className="cursor-pointer text-black" />
                        </button>
                        <button
                          className="bg-gray-200 text-white rounded-full py-1 px-1 text-xl"
                          onClick={() => handleDelete(review._id)}
                        >
                          <MdDelete className="cursor-pointer text-red-600" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Call to Action */}
      <section className="bg-green-200 text-black mt-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Experience the best products and services with our CMart.
        </p>
        <Link to="/products">
          <button className="bg-white text-gray-500 font-semibold cursor-pointer shadow-xl py-3 px-6 rounded-full hover:bg-gray-100 transition">
            Shop Now
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Reviews;