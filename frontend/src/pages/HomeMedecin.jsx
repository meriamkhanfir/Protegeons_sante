import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Calendrier from "../components/Calendrier";
import api from "../api";
import '../styles/NavBar.css'
import NavBar from "./NavBar";
function HomeMedecin({ onLogout }) {
  const { state } = useLocation();
  const idmedId = state ? state.idmed_id : localStorage.getItem("idmed_id");
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
  
  return (
    
    <div >
      <NavBar/>
      <div className="sous_container_homemed"></div>
      {Array.isArray(rendezVousData) && <Calendrier rendezVousData={rendezVousData} />} 
    </div>
  );
}

export default HomeMedecin;
