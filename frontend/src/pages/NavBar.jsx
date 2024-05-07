import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css'

const NavBar = () => {
  const { state } = useLocation();
  const idmedId = state ? state.idmed_id : localStorage.getItem("idmed_id");
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

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
    navigate("/Accueil/login");
  };

  useEffect(() => {
    if (idmedId) {
      localStorage.setItem("idmed_id", idmedId);
    }
  }, [idmedId]);

  return (
    <div>
      <nav className="nav_homemed">
        <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
          Menu
        </button>
        <ul className={`nav-menu ${showMenu? 'open' : ''}`}>
          {idmedId && (
            <div className="aligne_navbar_homemed">
              <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/login/home_medecin/${idmedId}`)}>Accueil</li>

              <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/login/home_medecin/registerpatient/${idmedId}`)}>Registrer un Patient</li>
              <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/login/home_medecin/CreateRv/${idmedId}`)}>Créer un Rendez-vous</li>
              <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/login/home_medecin/ListePatient/${idmedId}`)}>Liste des Patients</li>
              <li className="li-navbar_homemed" onClick={() => navigate(`/Accueil/login/home_medecin/Requests/${idmedId}`)}>Demandes de changement</li>
              <li className="li-navbar_homemed" onClick={handleLogout}>Déconnexion</li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;