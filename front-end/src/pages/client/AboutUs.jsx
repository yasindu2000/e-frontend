import { Link } from "react-router-dom";
import image1 from "../../../public/profile_img_1.png"
import image2 from "../../../public/profile_img_2.png"
import image3 from "../../../public/profile_img_3.png"


function AboutUs() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="bg-green-200 text-black py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          We are committed to providing the best online shopping experience with quality products and excellent customer service.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Mission</h2>
        <p className="text-center text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          Our mission is to make shopping easy, fun, and secure for everyone. We bring top-quality products directly to your doorstep.
        </p>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="p-6  rounded-lg shadow-xl shadow-gray-300 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p className="text-gray-600">We ensure the highest quality in every product we sell.</p>
          </div>
          <div className="p-6  rounded-lg shadow-xl shadow-gray-300 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
            <p className="text-gray-600">Our customers are our top priority, and we always put them first.</p>
          </div>
          <div className="p-6  rounded-lg shadow-xl shadow-gray-300 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Integrity</h3>
            <p className="text-gray-600">We are honest, transparent, and ethical in everything we do.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-30 h-30 mx-auto rounded-full shadow-xl shadow-gray-400  overflow-hidden mb-4">
              <img src={image2}alt="Team member" className="w-full h-full object-cover"/>
            </div>
            <h3 className="font-bold text-lg">Alice</h3>
            <p className="text-gray-600">CEO</p>
          </div>
          <div className="text-center">
            <div className="w-30 h-30 mx-auto rounded-full overflow-hidden shadow-xl shadow-gray-400 mb-4">
              <img src={image1} alt="Team member" className="w-full h-full object-cover "/>
            </div>
            <h3 className="font-bold text-lg">Bob</h3>
            <p className="text-gray-600">CTO</p>
          </div>
          <div className="text-center">
            <div className="w-30 h-30 mx-auto rounded-full shadow-xl shadow-gray-400 overflow-hidden mb-4">
              <img src={image3} alt="Team member" className="w-full h-full object-cover"/>
            </div>
            <h3 className="font-bold text-lg">Carol</h3>
            <p className="text-gray-600">Marketing</p>
          </div>
          <div className="text-center">
            <div className="w-30 h-30 mx-auto rounded-full shadow-xl shadow-gray-400 overflow-hidden mb-4">
              <img src={image1} alt="Team member" className="w-full h-full object-cover"/>
            </div>
            <h3 className="font-bold text-lg">David</h3>
            <p className="text-gray-600">Sales</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-200 text-black py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
        <p className="mb-6 max-w-2xl mx-auto">Experience the best products and services with our CMart.</p>
        <Link to="/products"><button className="bg-white text-gray-500 font-semibold cursor-pointer shadow-xl py-3 px-6 rounded-full hover:bg-gray-100 transition">
          Shop Now
        </button>
        </Link>
      </section>
    </div>
  );
}

export default AboutUs;
