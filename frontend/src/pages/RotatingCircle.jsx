import React, { useState } from "react";
import "../styles/RotatingCircle.css";
import logoImage from "../images/logo.png";
//import medBackgroundImage from "./med_background3.png";

import medBackgroundImage2 from "../images//med_background2.png";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../api";

const RotatingCircle = () => {
  const [showMedBackground, setShowMedBackground] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const navigate = useNavigate();
  const handleLogoFallEnd = () => {
    setShowMedBackground(true);
    setTimeout(() => {
      setZoomIn(true); // Après 3 secondes, activer l'animation du bouton
    }, 5000);
  };

  const handleZoomIn = () => {
    // Define the behavior when the zoom button is clicked
    // For example, you can implement zooming functionality here
    console.log("Zoom In button clicked");
  };

  return (
    <div className="rotating-rectangle-container">
      <div className="rectangle">
        <div className="circle top-left"></div>
        <div className="circle bottom-right"></div>
      </div>
      <img
        src={logoImage}
        alt="logo"
        className="logo-background"
        onAnimationEnd={handleLogoFallEnd} // Lorsque l'animation de chute se termine
      />
      {showMedBackground && (
        <>
          <img
            src={medBackgroundImage2}
            alt="med background2"
            className={zoomIn ? "med-background2 zoom-in" : "med-background2"}
          />
          {zoomIn && (
            <button  onClick={() => navigate("Accueil/")} className="zoom-button">
              Bienvenue
            </button>
          )}
        </>
      )}
      
   
    </div>
  );
};

export default RotatingCircle;
