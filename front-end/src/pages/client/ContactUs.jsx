import facebook from "../../../public/facebook.png";
import instagram from "../../../public/instagram.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import MapComponent from "../../components/mapComponent";


function ContactUs() {




  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_SECRET_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      toast.success("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message);
      setResult();
    }
  };
  return (
    <div className=" min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-200 text-black py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          We are here to help you! Reach out to us anytime and we will get back
          to you as soon as possible.
        </p>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-700 text-lg">
            Have any questions or need support? Send us a message or reach out
            directly using the info below.
          </p>
          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-bold">Email:</span> support@cmart.com
            </p>
            <p>
              <span className="font-bold">Phone:</span> +94 123 456 789
            </p>
            <p>
              <span className="font-bold">Address:</span> 123 Main Street,
              Colombo, Sri Lanka
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 text-blue-600 text-xl mt-4">
              <a href="#">
                <img
                  src={facebook}
                  alt=""
                  className="w-8.5 h-8.5 rounded-full shadow-sky-600 shadow-md"
                />
              </a>
              <a href="#">
                <img
                  src={instagram}
                  alt=""
                  className="w-8 h-8 shadow-md rounded-xl shadow-pink-800"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-xl shadow-xl space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full shadow-md shadow-gray-300 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full shadow-md shadow-gray-300  rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Message
            </label>
            <textarea
              rows="5"
              name="message"
              placeholder="Your Message"
              className="w-full shadow-md shadow-gray-300 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full cursor-pointer hover:bg-blue-700 transition w-full"
          >
            {result ? result : "Send Message"}
          </button>
        </form>
      </section>

      {/* Map Section */}
     {/* Map Section */}
<section className="py-16 px-4 max-w-6xl mx-auto">
  <h2 className="text-3xl font-semibold text-center mb-8">Our Location</h2>
  <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
    <MapComponent/>
  </div>
</section>

      {/* Call to Action */}
      <section className="bg-green-200 text-black mt-4 py-16 text-center">
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

export default ContactUs;
