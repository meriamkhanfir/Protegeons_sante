// Notification.js
import React, { useState, useEffect } from 'react';
import photo_n1 from '../img_notif/photo_n1.png';
import photo_n2 from '../img_notif/photo_n2.png';
import photo_n3 from '../img_notif/photo_n3.png';
import photo_n4 from '../img_notif/photo_n4.png';
import photo_n5 from '../img_notif/photo_n5.png';
import photo_n6 from '../img_notif/photo_n6.png';
import photo_n7 from '../img_notif/photo_n7.png';
import photo_n15 from '../img_notif/photo_n15.png';
import photo_q1 from '../img_notif/photo_q1.png';
import photo_q2 from '../img_notif/photo_q2.png';
import photo_q3 from '../img_notif/photo_q3.png';
import photo_q4 from '../img_notif/photo_q4.png';
import photo_y1 from '../img_notif/photo_y1.png';
import photo_y2 from '../img_notif/photo_y2.png';
import photo_y3 from '../img_notif/photo_y3.png';
import photo_y4 from '../img_notif/photo_y4.png';
import photo_y5 from '../img_notif/photo_y5.png';
import photo_y6 from '../img_notif/photo_y6.png';
import photo_y7 from '../img_notif/photo_y7.png';
import photo_y8 from '../img_notif/photo_y8.png';
import photo_y9 from '../img_notif/photo_y9.png';
import photo_y10 from '../img_notif/photo_y10.png';
import photo_y11 from '../img_notif/photo_y11.png';
import photo_y12 from '../img_notif/photo_y12.png';
import photo_y13 from '../img_notif/photo_y13.png';
import photo_y14 from '../img_notif/photo_y14.png';
import photo_y15 from '../img_notif/photo_y15.png';
import '../styles/PhotoApp.css'

 

const PhotoApp = ({ message, onClose }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const conseils = [
    { id: 1, text: 'Contrôlez vos portions : Surveillez la taille de vos portions pour éviter une consommation excessive de glucides, de graisses et de calories.' },
    { id: 2, text: 'Choisissez des aliments à faible indice glycémique : Optez pour des aliments qui ont un impact plus lent sur la glycémie, comme les grains entiers, les légumes non féculents et les fruits frais.' },
    { id: 3, text: 'Priorisez les fibres : Les aliments riches en fibres, comme les grains entiers, les légumes, les fruits et les légumineuses, peuvent aider à stabiliser la glycémie en ralentissant la digestion et en favorisant la satiété.' },
    { id: 4, text: 'Limitez les sucres ajoutés : Évitez les aliments et les boissons riches en sucres ajoutés, comme les sodas, les bonbons et les pâtisseries, car ils peuvent entraîner des pics de glycémie.' },
    { id: 5, text: "Choisissez des graisses saines : Optez pour des graisses saines comme celles que l'on trouve dans les avocats, les noix, les graines et les poissons gras, tout en limitant les graisses saturées et les graisses trans." },
    { id: 6, text: "Planifiez vos repas : Planifiez vos repas à l'avance pour vous assurer de faire des choix alimentaires sains et équilibrés tout au long de la journée." },
  ];

  
 
  

  const photos = [
    { id: 1, url: photo_n1 },
    { id: 2, url: photo_y2 },
    { id: 3, url: photo_y8 }, 

    { id: 4, url: photo_n5 },
    { id: 5, url: photo_y9 }, 
    { id: 6, url: photo_y10 }, 
    { id: 7, url: photo_y14 }, 
    // Ajoutez d'autres photos ici
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % conseils.length);
    }, 8000); // Changement de message toutes les 10 secondes

    return () => clearInterval(interval);
  }, []); // Effect exécuté une seule fois après le montage

  return (
    <div className='container_photoapp'>
    <img  className='img-photoapp' src={photos[currentMessageIndex].url} alt={`photo_${currentMessageIndex + 1}`} />
    <p className='conseil_photoapp'><strong>{conseils[currentMessageIndex].text}</strong></p>
  </div>
);
};

    
  

export default PhotoApp;
