import React, { useState, useEffect } from 'react';
import "../styles/Slideshow.css";
const Slideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change d'image toutes les 3 secondes

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={index === currentImageIndex ? 'slide active' : 'slide'}
        />
      ))}
    </div>
  );
};

export default Slideshow;
