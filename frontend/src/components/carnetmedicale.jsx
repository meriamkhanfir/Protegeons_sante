import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../styles/CarnetMedicale.css';
import infopers from '../images/infopers.png';
import infopers1 from '../images/infopers1.png';
import carnet from '../images/carnet.png';
import consult1 from '../images/consult1.png';
import api from "../api";
import TabWidget from '../pages/TabWidget'; // Assurez-vous que le chemin d'importation est correct
import NavBar from "../pages/NavBar";
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
    // Appels à l'API pour récupérer les informations du patient et les consultations
    api.get(`/api/patients/${patientId}/`)
      .then((res) => {
        setPatientInfo(res.data);
      })
      .catch((error) => {
        console.error('Error fetching patient information:', error);
      });

    api.get(`/api/consultations/${patientId}/`)
      .then((res) => {
        setConsultations(res.data.consultations);
      })
      .catch((error) => {
        console.error('Error fetching patient consultations:', error);
      });
  }, [patientId]);

  
  
  
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
    api.put(`/api/patients/update/${patientId}/`, editedPatientInfo)
      .then((res) => {
        //setPatientInfo(res.data);
        setIsEditing(false); // Désactive le mode édition après la mise à jour
      })
      .catch((error) => {
        console.error('Error updating patient information:', error);
      });
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
                  <label>Poids:</label>
                  <input type="text" name="poids" value={editedPatientInfo.poids} onChange={handleInputChange} />
                  <label>Taille:</label>
                  <input type="text" name="taille" value={editedPatientInfo.taille} onChange={handleInputChange} />
                  <label>Allergies:</label>
                  <input type="text" name="allergies" value={editedPatientInfo.allergies} onChange={handleInputChange} />
                  <button onClick={handleSubmit}>Enregistrer</button>
                </>
              ) : (
                <>
                  <p>Nom: {patientInfo.nom}</p>
                  <p>Prénom: {patientInfo.prenom}</p>
                  <p>email: {patientInfo.email}</p>
                  <p>Date de Naissance: {patientInfo.date_de_naissance}</p>
                  <p>Poids: {patientInfo.poids}</p>
                  <p>Taille: {patientInfo.taille}</p>
                  <p>Allergies: {patientInfo.allergies}</p>
                  <p>Type diabète: {patientInfo.type_diabete}</p>
                  <p>Groupe Sanguin: {patientInfo.groupe_sanguin}</p>
                  <button onClick={handleEditClick}>Modifier</button>
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
                <p>Date de consultation: {selectedConsultation.date_consultation}</p>
                <p>Heure de consultation: {selectedConsultation.heure_consultation}</p>
                <p>Ordonnance: {selectedConsultation.ordonnance}</p>
                <p>Description: {selectedConsultation.description}</p>
                <p>Bilan: {selectedConsultation.bilan}</p>
                <p>Médecin: {selectedConsultation.medecin}</p>
                <p>Bilan PDF: {selectedConsultation.bilan_pdf ? <a href={`http://localhost:8000${selectedConsultation.bilan_pdf}`} target="_blank" rel="noopener noreferrer">Voir le PDF</a> : "Aucun fichier PDF disponible"}</p>
                </div>
            )}
              </div>
        </TabWidget>
      </div>
    </div>
  );
}

export default CarnetMedical;
