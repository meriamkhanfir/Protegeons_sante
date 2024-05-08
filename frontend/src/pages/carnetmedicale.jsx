import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../styles/CarnetMedicale.css';
import infopers from '../images/infopers.png';
import infopers1 from '../images/infopers1.png';
import carnet from '../images/carnet.png';
import consult1 from '../images/consult1.png';
import api from "../api";
import TabWidget from '../pages/TabWidget'; // Assurez-vous que le chemin d'importation est correct
import NavBar from './NavBar';

function CarnetMedical() {
  
  const { patientId } = useParams();
  const [patientInfo, setPatientInfo] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatientInfo, setEditedPatientInfo] = useState({
    poids: '',
    taille: '',
    allergies: ''
  });
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  useEffect(() => {
    // Appels à l'API pour récupérer les informations du patient
    api.get(`http://localhost:8000/api/patients/${patientId}/`)
      .then((res) => {
        setPatientInfo(res.data);
        setEditedPatientInfo(res.data); // Initialise les informations éditées avec les données actuelles
      })
      .catch((error) => {
        console.error('Error fetching patient information:', error);
      });

  }, [patientId]);

  const handleshowConsultations = () => {
    api.get(`http://localhost:8000/api/consultations/${patientId}/`)
      .then((res) => {
        setConsultations(res.data.consultations);
        
      })
      .catch((error) => {
        console.error('Error fetching patient consultations:', error);
      });
  };
  
  
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatientInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setPatientInfo(editedPatientInfo);
    // Envoyer les informations mises à jour à l'API
    api.put(`http://localhost:8000/api/patients/update/${patientId}/`, editedPatientInfo)
      .then((res) => {
        //setPatientInfo(res.data);
        setIsEditing(false); // Désactive le mode édition après la mise à jour
      })
      .catch((error) => {
        console.error('Error updating patient information:', error);
      });
  };
  useEffect(() => {
    handleshowConsultations();
  }, []);

  const handleConsultationClick = (consultation) => {
    setSelectedConsultation(consultation);

  };
  
  if (!patientInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container_carnetmedical">
   <NavBar/>

<div className="carnet-medical_carnetmedical"> 
<img src={carnet} alt="carnet" className="carnet_carnetmedical" />
        <h1>Carnet Médical</h1>
        <img src={infopers} alt="secret" className="infopers_carnetmedical" />
        <TabWidget>
          <div label="Informations personnelles">
          <div className='left_carnetmedical'>
          <img src={infopers1} alt="infopers" className="infopers1_carnetmedical" />
            </div>
            <div className='right_carnetmedical'>
              {isEditing ? (
                <>
                <label className="label_carnetmedical">Poids:</label>
                <input className="input_carnetmedical" type="text" name="poids" value={editedPatientInfo.poids} onChange={handleInputChange} />
                <label className="label_carnetmedical">Taille:</label>
                <input className="input_carnetmedical" type="text" name="taille" value={editedPatientInfo.taille} onChange={handleInputChange} />
                <label className="label_carnetmedical">Allergies:</label>
                <input className="input_carnetmedical" type="text" name="allergies" value={editedPatientInfo.allergies} onChange={handleInputChange} />
                <button className="bouton-modifier_carnetmedical" onClick={handleSubmit}>Enregistrer</button>
              </>
              ) : (
                <>
                  <p><strong>Nom: </strong>{patientInfo.nom}</p>
                  <p><strong>Prénom:</strong> {patientInfo.prenom}</p>
                  <p><strong>email: </strong>{patientInfo.email}</p>
                  <p><strong>Date de Naissance:</strong> {patientInfo.date_de_naissance}</p>
                  <p><strong>Poids:</strong> {patientInfo.poids}</p>
                  <p><strong>Taille: </strong>{patientInfo.taille}</p>
                  <p><strong>Allergies: </strong>{patientInfo.allergies}</p>
                  <p><strong>Type diabète:</strong> {patientInfo.type_diabete}</p>
                  <p><strong>Groupe Sanguin:</strong> {patientInfo.groupe_sanguin}</p>
                  <button className="bouton-modifier_carnetmedical" onClick={handleEditClick}>Modifier</button>
                </>
              )}
            </div>
          </div>

          <div label="Consultations">
          <div className="consultations-container_carnetmedical">
            {consultations.map((consultation, index) => (
                <button key={consultation.id} className="consultation_carnetmedical" onClick={() => setSelectedConsultation(consultation)}>{`Consultation ${index + 1}`}</button>
      
              ))}
            </div>
            {selectedConsultation && (
              <div className="selected-consultation">
                <h2>Consultation sélectionnée</h2>
                <p> <strong>Date de consultation:</strong> {selectedConsultation.date_consultation}</p>
                <p><strong>Heure de consultation: </strong>{selectedConsultation.heure_consultation}</p>
                <p><strong>Ordonnance:</strong> {selectedConsultation.ordonnance}</p>
                <p><strong>Description:</strong> {selectedConsultation.description}</p>
                <p><strong>Bilan:</strong> {selectedConsultation.bilan}</p>
                <p><strong>Médecin: </strong>{selectedConsultation.medecin}</p>
                <p><strong>Bilan PDF:</strong> {selectedConsultation.bilan_pdf ? <a href={`http://localhost:8000${selectedConsultation.bilan_pdf}`} className="voirpdf_carnetmedical" target="_blank" rel="noopener noreferrer">Voir le PDF</a> : "Aucun fichier PDF disponible"}</p>                              
              </div>
            )}
          </div>
        </TabWidget>
      </div>
    </div>
  );
}

export default CarnetMedical;