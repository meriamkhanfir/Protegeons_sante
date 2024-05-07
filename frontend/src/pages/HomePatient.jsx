import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from "../api";
import NavBarPatient from './NavBarPatient';
import PhotoApp from "./PhotoApp";
import Notification from './Notification';
import '../styles/homepatient.css';
// Importez les images ici
import saladeImage from "../images/salade.jpg";
import tartineSaleeImage from "../images/tartinesalée.jpg";
import boulgourImage from "../images/boulgour.jpg";
import velouteCourgeLentillesImage from "../images/velouté.jpg";

const HomePatient = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { patientId } = useParams(); // Récupérer l'ID du patient à partir des paramètres d'URL

  useEffect(() => {
    // Utiliser l'ID récupéré pour le patient
    console.log("Patient ID:", patientId);
  }, [patientId]);

  
  
  const [showNotification, setShowNotification] = useState(true);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const recommendedMeals = [
    {
      label: 'Salade',
      ingredients: ['Lettue', 'tomate', 'champignon', 'blanc de poulet', 'oeuf'],
      calories: 50,
      water: 71,
      proteins: 8.13,
      glucides: 4.88,
      image: saladeImage // Ajoutez l'image ici
    },
    {
      label: 'Tartine salée',
      ingredients: ['Pain complet', 'oeuf', 'avocat', 'pignon'],
      calories: 80,
      water: 31,
      proteins: 5.32,
      glucides: 2.18,
      image: tartineSaleeImage // Ajoutez l'image ici
    },
    {
      label: 'Boulgour',
      ingredients: ['Blanc de poulet', 'carrot','tomate', 'boulgour'],
      calories: 95,
      water: 53,
      proteins: 9.34,
      glucides: 4.88,
      image: boulgourImage // Ajoutez l'image ici
    },
    {
      label: 'Velouté de Courge aux lentilles',
      ingredients: ['Lentilles', 'sésame'],
      calories: 60,
      water: 68,
      proteins: 4.23,
      glucides: 2.08,
      image: velouteCourgeLentillesImage // Ajoutez l'image ici
    },
  ];

  return (
    <div className="container_hm">
       <NavBarPatient/>
      <div>
      {showNotification && (
        <Notification message="Répondre Oui ou Non à cette question" onClose={handleCloseNotification} />
      )}
    </div>
      <main>
        <h2>Vos repas recommandés</h2>
        <ul className="meal-list">
          {recommendedMeals.map((meal, index) => (
            <li key={index} className="recommended-meal">
              <div className="meal-container">
                <div className="meal-card">
                  <img className='img-meal_homepatient' src={meal.image} alt={meal.label} />
                  <div className="meal-info">
                    <h3>{meal.label}</h3>
                    <div className="meal-details">
                      <p><strong>Composants:</strong> {meal.ingredients.map((ingredient, i) => (
                          <li key={i}>{ingredient}</li>
                        ))}
                      </p>
                      <p><strong>Calories (100g):</strong> {meal.calories}</p>
                      <p><strong>Eau (100g):</strong> {meal.water}</p>
                      <p><strong>Protéines (100g):</strong> {meal.proteins}</p>
                      <p><strong>Glucides (100g):</strong> {meal.glucides}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <PhotoApp/>
    </div>
  );
};

export default HomePatient;
