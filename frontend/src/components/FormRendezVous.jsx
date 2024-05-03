import "../styles/CreateRv.css";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import createrv from "../images/createrv.png";
import api from '../api';
import { useNavigate,useParams } from 'react-router-dom';


// Définition de la fonction fetchPatientIdByEmail
/*const fetchPatientIdByEmail = async (email) => {
    try {
        const response = await api.get(`/api/user/getPatientByEmail/${email}`);
        return response.data.id;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID du patient :', error);
        return null;
    }
};*/

const FormRv = () => {
    const { medecinId } = useParams(); 
    const [rendezVous, setRendezVous] = useState({
        email: '',
        dateConsultation: new Date(),
        heureConsultation: '',
        notes: '',
        idpat:0
    });
    
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRendezVous({ ...rendezVous, [name]: value });
    };

    const handleDateChange = (date) => {
        setRendezVous({ ...rendezVous, dateConsultation: date });
    };

    const handleHeureChange = (heure) => {
        setRendezVous({ ...rendezVous, heureConsultation: heure });
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dateFormatted = `${rendezVous.dateConsultation.getFullYear()}-${(rendezVous.dateConsultation.getMonth() + 1).toString().padStart(2, '0')}-${rendezVous.dateConsultation.getDate().toString().padStart(2, '0')}`;
            console.log("Données du formulaire :", rendezVous);
            const response = await api.post(`/api/user/createRv/${medecinId}`, {
                email: rendezVous.email,
                dateConsultation: dateFormatted,
                heureConsultation: rendezVous.heureConsultation,
                notes: rendezVous.notes,
                idpat: rendezVous.idpat,
                idmed: medecinId ? medecinId : 0
            });
            console.log('Réponse de la création du rendez-vous :', response.data);
            // Redirection ou autre traitement après la création du rendez-vous
            if (response.data.success) {
                navigate(`/Accueil/login/home_medecin/${medecinId}`, { state: { idmed_id: medecinId } });
              } else {
                console.error("L'inscription a échoué.");
              }

        } catch (error) {
            console.error("Erreur lors de la création du rendez-vous :", error);
            if (error.response && error.response.data && error.response.data.error) {
                const errorMessage = error.response.data.error;
                alert(errorMessage); // Afficher l'erreur dans une alerte
            } else if (error.response && error.response.data && error.response.data.type) {
                const errorType = error.response.data.type;
                if (errorType === "creneau_existant") {
                    alert("Ce créneau est déjà pris par un autre patient.");
                } else if (errorType === "patient_invalide") {
                    alert("Vous n'êtes pas autorisé à créer un rendez-vous pour ce patient.");
                } else if (errorType === "intervalle_invalide") {
                    alert("Il doit y avoir un intervalle de 20 minutes minimum entre les rendez-vous.");
                } else {
                    alert("Une erreur inattendue s'est produite. Veuillez réessayer.");
                }
            } else {
                alert("Une erreur est survenue lors de la création du rendez-vous. Veuillez réessayer.");
            }
        }
    };
    
    
    return (
      <div className="container_formrendezvous">
        
            <h1 className="title_rv_formrendezvous">Créer un rendez-vous</h1>
            <div className="format_formrendezvous">
                <div className="right_formrendezvous">
                    <img src={createrv} alt="createrv" className="createrv_formrendezvous" />
                </div>
                <div className="left_formrendezvous">
                    <div className="sous_container_formrendezvous">
                        <form onSubmit={handleSubmit}>
                        <label className='label_formrendezvous'>
                             Email du patient:
                        <input className='input_formrendezvous'
                        type="email"
                        name="email"
                        id="email"
                        value={rendezVous.email}
                        placeholder="exemple@gmail.com"
                        onChange={handleInputChange}
                        />
                        </label>
                        <label className='label_formrendezvous'>
                             Date de consultation:
                             <DatePicker className='datepicker_formrendezvous'
                                 selected={rendezVous.dateConsultation}
                                 onChange={handleDateChange}
                                 dateFormat="yyyy-MM-dd"
                                 id="dateConsultation"
                                />
                            </label>
                            <label className='label_formrendezvous'>
                                Heure de consultation:
                                <input className='input_formrendezvous'
                                    type="time"
                                    value={rendezVous.heureConsultation}
                                    onChange={(e) => handleHeureChange(e.target.value)}
                                    id="heureConsultation"
                                />
                            </label>
                            <label className='label_formrendezvous'>
                                Description:
                                <textarea
                                    className="notes-textarea_formrendezvous"
                                    name="notes"
                                    id="notes"
                                    value={rendezVous.notes}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button className="confirm-button_formrendezvous" type="submit">Confirmer</button>
                            <button className="cancel-button_formrendezvous">Annuler</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormRv;