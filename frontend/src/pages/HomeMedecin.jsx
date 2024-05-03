import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Calendrier from "../components/Calendrier";
import api from "../api";
import '../styles/NavBar.css'
function HomeMedecin({ onLogout }) {
  const { state } = useLocation();
  const idmedId = state ? state.idmed_id : null;
  const navigate = useNavigate();
  const [rendezVousData, setRendezVousData] = useState([]);

  useEffect(() => {
    if (idmedId) {
      getRendezVous();
    }
  }, [idmedId]);

  const getRendezVous = () => {
    api
      .get(`http://localhost:8000/api/medecin/rendez-vous/${idmedId}/`)
      .then((res) => res.data)
      .then((data) => {
        const promises = data.rendez_vous.map((rendezVous) => {
          return api.get(`http://localhost:8000/api/patients/${rendezVous.idpat}/`).then((res) => res.data);
        });

        Promise.all(promises)
          .then((patientDataArray) => {
            const events = data.rendez_vous.map((rendezVous, index) => {
              const patientData = patientDataArray[index];
              const title = `${patientData.nom} ${patientData.prenom} (${patientData.email})`;
              return {
                id: rendezVous.id,
                start: new Date(rendezVous.date_consultation + ' ' + rendezVous.heure_consultation),
                end: new Date(rendezVous.date_consultation + ' ' + rendezVous.heure_consultation),
                title: title,
                location: rendezVous.location,
              };
            });
            setRendezVousData(events);
          })
          .catch((error) => {
            console.error('Error fetching patient details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching rendez-vous:', error);
      });
  };
  
  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/Accueil/login"); 
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    
    <div >
      <nav className="nav_homemed">
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Menu
        </button>
        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
         
          {idmedId && (
            <div className="aligne_navbar_homemed">
             
                <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/login/home_medecin/registerpatient/${idmedId}`)} > Registrer un Patient</li> 
              <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/login/home_medecin/CreateRv/${idmedId}`)}>
               Créer un Rendez-vous</li>
            
             <li className="li-navbar_homemed"onClick={() => navigate(`/Accueil/login/home_medecin/ListePatient/${idmedId}`)}>
                Liste des Patients</li>
              <li className="li-navbar_homemed"onClick={() => navigate(`/Accueil/login/home_medecin/Requests/${idmedId}`)}>
                Demandes de changement</li>
             
              <li className="li-navbar_homemed"onClick={handleLogout}>
                Déconnexion</li>
             
            </div>
          )}
        </ul>
      </nav>
      <div className="sous_container_homemed"></div>
      {Array.isArray(rendezVousData) && <Calendrier rendezVousData={rendezVousData} />} 
    </div>
  );
}

export default HomeMedecin;
