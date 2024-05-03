import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importer useParams
import api from '../api'; 
import "../styles/AgendaPatient.css";
import Slideshow from './Slideshow'; // Importer le composant Slideshow
import agenda1Image from "../images/agenda1.png";
import agenda2Image from "../images/agenda2.png";
import agenda3Image from "../images/agenda3.png";
import agenda4Image from "../images/agenda4.png";

;


function Agenda() {
  const images = [agenda1Image , agenda4Image, agenda2Image,agenda3Image ];
    const [rendezVous, setRendezVous] = useState([]);
    const { patientId } = useParams(); // Récupérer l'ID du patient depuis les paramètres d'URL

    useEffect(() => {
        const fetchRendezVous = async () => {
            try {
                const response = await api.get(`api/rendez-vous-patient/${patientId}/`); // Utiliser l'ID du patient dans la requête API
                setRendezVous(response.data.rendez_vous);
            } catch (error) {
                console.error('Erreur lors de la récupération des rendez-vous:', error);
            }
        };

        fetchRendezVous();
    }, [patientId]); // Ajouter patientId comme dépendance pour rafraîchir les rendez-vous lorsque l'ID du patient change

    return (
        <div className="agenda-container_agendapatient">
        <div className='slideshow_agendapatient'>    <Slideshow images={images}  />
        </div>
           <div className="agenda_agendapatient">

    <h2 className="agenda-title_agendapatient">Agenda des Rendez-vous</h2>


    <table className="agenda-table_agendapatient">
                <thead>
                    <tr>
                        <th>Date rendez-vous</th>
                        <th>Heure rendez-vous</th>
                        <th>Nom & prenom du Médecin</th>
                        <th>Mobile Medecin</th>
                    </tr>
                </thead>
                <tbody>
                    {rendezVous.map(rendezVous => (
                        <tr key={rendezVous.id}>
                            <td>{rendezVous.date_consultation}</td>
                            <td>{rendezVous.heure_consultation}</td>
                            <td>{rendezVous.nomMedecin}, {rendezVous.prenomMedecin}</td>
                            <td>{rendezVous.mobile}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/Accueil/loginpatient/home_patient/${patientId}`} className="back-link_agendapatient">Retourner à l'accueil</Link>
        </div>
        </div>
    );
}

export default Agenda;
