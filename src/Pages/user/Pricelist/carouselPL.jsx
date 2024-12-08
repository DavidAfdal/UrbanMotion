import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./caraousel.css";
// import { useNavigate } from "react-router-dom"; // Jika menggunakan react-router untuk navigasi

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slide animation variants for smooth left-right sliding effect
  const slideVariants = {
    hiddenRight: { x: "100%", opacity: 0 }, // Slide from right (off-screen)
    hiddenLeft: { x: "-100%", opacity: 0 }, // Slide from left (off-screen)
    visible: { x: "0%", opacity: 1, transition: { duration: 0.5 } }, // Bring to center
    exit: { x: "100%", opacity: 0, transition: { duration: 0.5 } }, // Slide out to the right on exit
  };

  // Handle navigation to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handle navigation to the previous slide
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container relative">
      <div className="carousel-images relative">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            className="w-full h-full object-cover"
            initial={currentIndex > 0 ? "hiddenLeft" : "hiddenRight"}
            animate="visible"
            exit="exit"
            variants={slideVariants}
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2  rounded-full cursor-pointer"
          onClick={handlePrevious}>
          <i className="fas fa-chevron-left text-white w-15 h-15"></i>
        </div>
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2  rounded-full cursor-pointer"
          onClick={handleNext}>
          <i className="fas fa-chevron-right text-white w-15 h-15"></i>
        </div>
      </div>
      {/* Sewa Button */}
      <div className="absolute mb-10 bottom-12 left-1/2 transform -translate-x-1/2 z-10">
      <a href="/sewa">
        <button className="rent-button-carousel">
            Sewa
        </button>
      </a>

      </div>
      {/* Dots */}
      <div className="carousel-indicators absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-primary-20" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
