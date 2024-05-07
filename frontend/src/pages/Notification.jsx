// Notification.js
import React, { useState, useEffect } from 'react';

import photo_y3 from '../img_notif/photo_y3.png';
import photo_y4 from '../img_notif/photo_y4.png';
import photo_y5 from '../img_notif/photo_y5.png';
import photo_y6 from '../img_notif/photo_y6.png';
import photo_y11 from '../img_notif/photo_y11.png';
import photo_y12 from '../img_notif/photo_y12.png';
import photo_y13 from '../img_notif/photo_y13.png';
import photo_y15 from '../img_notif/photo_y15.png';

import '../styles/Notification.css';

const Notification = ({ onClose }) => {
  const messages = [
    { id: 1, text: "Yoga est un bon sport " },
    { id: 2, text: "Jouez le football c'est bien pour la santé" },

    { id: 3, text: "N'oubliez pas de pratiquer le sport" },

    { id: 4, text: "N'oubliez pas de boire de l'eau" },
    { id: 5, text: "N'oubliez pas de faire tapis" },

  ];

  const photos = [
    photo_y3,
    photo_y5,
    photo_y6,
    photo_y12,
    photo_y15,
    // Ajoutez d'autres photos ici
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 10000); // 10000 millisecondes = 10 secondes

    return () => clearTimeout(timer);
  }, [index, messages]);

  return (
    <div className="notification">
      <div className="notification-content">
        <h2>{messages[index].text}</h2>
        <img className='img_notif' src={photos[index]} alt="Notification" />
      </div>
      <button onClick={onClose} className="close-button">
        Fermer
      </button>
    </div>
  );
};

export default Notification;
