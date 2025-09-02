import { useState } from "react";

function ImageSlider({ images }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="w-full max-w-[400px] mx-auto">
      {/* Main Image */}
      <img
        src={images[activeImageIndex]}
        alt=""
        className="w-full h-[300px] sm:h-[400px] object-cover rounded-[5px]"
      />

      {/* Thumbnails */}
      <div className="w-full flex flex-wrap justify-center items-center gap-2 mt-2">
        {images.map((image, index) => (
          <img
            key={index}
            onClick={() => setActiveImageIndex(index)}
            src={image}
            alt=""
            className={`w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] object-cover cursor-pointer rounded-md ${
              activeImageIndex === index ? "border-[3px] border-blue-500" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
