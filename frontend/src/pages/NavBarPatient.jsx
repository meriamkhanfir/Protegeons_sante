// src/NavBarPatient.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Notification from '../components/notif'; // Importer le composant Notification
import '../styles/NavBar.css';

const NavBarPatient = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { patientId } = useParams(); // Récupérer l'ID du patient à partir des paramètres d'URL
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Utiliser l'ID récupéré pour le patient
    console.log("Patient ID:", patientId);
  }, [patientId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Accueil/loginpatient");
  };

  return (
    <div> 
      <nav className="nav_homemed">
        <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
          Menu
        </button>
        <ul className={`nav-menu ${showMenu ? 'open' : ''}`}>
          {patientId && (
            <div className="aligne_navbar_homemed">
              <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/loginpatient/home_patient/${patientId}`)}> 
                Accueil
              </li>
              <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/loginpatient/home_patient/carnet_medical/${patientId}`)}>  
                Carnet médical
              </li> 
              <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/loginpatient/home_patient/DemandeChangementDoctor/${patientId}`)}>
                Changement médecin
              </li>
              <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/loginpatient/home_patient/Agenda/${patientId}`)}>
                Agenda
              </li>
              <li className="li-navbar_homemed" onClick={handleLogout}>
                Déconnexion
              </li>
            </div>
          )}
        </ul>
        <Notification patientId={patientId} /> {/* Passer l'ID du patient au composant Notification */}
      </nav>
    </div>
  );
}

export default NavBarPatient;
