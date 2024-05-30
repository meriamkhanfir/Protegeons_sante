import React, { useState, useEffect } from 'react';
import { differenceInYears } from 'date-fns';
import '../styles/NavBar.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/listePatient.css';
import patientImage from "../images/patients.png";
import consultImage from "../images/consult1.png";
import supprimerImage from "../images/supprimer.png";
import NavBar from './NavBar';

function Listepatient() {
  const { state } = useLocation();
  const idmedId = state ? state.idmed_id : null;
  const navigate = useNavigate();
  const { medecinId } = useParams();

  const [patientsData, setPatientsData] = useState([]);
  const [showPatients, setShowPatients] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [sortBy, setSortBy] = useState("nom");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [patientIdToDelete, setPatientIdToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    handleShowPatients();
  }, [medecinId]);

  const handleShowPatients = () => {
    api.get(`http://localhost:8000/api/medecin/ListesPatients/${medecinId}/`)
      .then((res) => {
        setPatientsData(res.data.patients);
        setShowPatients(true);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  };

  const handleGetPatientInfo = (patientId) => {
    api.get(`http://localhost:8000/api/patients/${patientId}`)
      .then((res) => {
        setSelectedPatient(res.data);
      })
      .catch((error) => {
        console.error('Error fetching patient information:', error);
      });
  };

  const handleDeletePatient = () => {
    if (patientIdToDelete) {
      setPatientsData(patientsData.filter(patient => patient.id !== patientIdToDelete));
      setShowConfirmation(false);
      setPatientIdToDelete(null);
    }
  };

  const confirmDeletion = (patientId) => {
    setPatientIdToDelete(patientId);
    setShowConfirmation(true);
  };

  const filteredPatientsData = patientsData.filter((patient) => {
    return (
      patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedPatientsData = filteredPatientsData.sort((a, b) => {
    if (sortBy === "nom" || sortBy === "prenom") {
      const nameA = a[sortBy].toUpperCase();
      const nameB = b[sortBy].toUpperCase();
      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    }
    if (sortBy === "age") {
      return sortOrder === "asc" 
        ? differenceInYears(new Date(), new Date(a.date_de_naissance)) - differenceInYears(new Date(), new Date(b.date_de_naissance))
        : differenceInYears(new Date(), new Date(b.date_de_naissance)) - differenceInYears(new Date(), new Date(a.date_de_naissance));
    }
    return 0;
  });

  const toggleSortOrder = (sortByField) => {
    if (sortBy === sortByField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
    }
    setSortBy(sortByField);
  };

  return (
    <div className="container_listepatient">
      <NavBar/>
      {showPatients && (
        <div className="format_listepatient">
          <h1 className="title_patients_listepatient">Liste des patients</h1>
          <div className="right_listepatient">
            <img src={consultImage} alt="consult" className="consult_listepatient" />
          </div>
          <div className="left_listepatient">
            <img src={patientImage} alt="patient" className="patient_listepatient" />
            <div className="table-container_listepatient">
              <div className="search-container_listepatient">
                <input
                  type="text"
                  placeholder="Rechercher"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button className="clean-button_listepatient" onClick={() => setSearchTerm("")}>
                  Nettoyer
                </button>
                <button className="ajout-button_listepatient" onClick={() => navigate(`/Accueil/login/home_medecin/registerpatient/${medecinId}`)}>
                  Ajouter un patient
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => toggleSortOrder("nom")}>
                      Nom
                      {sortBy === "nom" && <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>}
                    </th>
                    <th onClick={() => toggleSortOrder("prenom")}>
                      Prénom
                      {sortBy === "prenom" && <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>}
                    </th>
                    <th onClick={() => toggleSortOrder("age")}>
                      Âge
                      {sortBy === "age" && <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>}
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPatientsData.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.nom}</td>
                      <td>{patient.prenom}</td>
                      <td>{differenceInYears(new Date(), new Date(patient.date_de_naissance))}</td>
                      <td>
                        <button onClick={() => navigate(`/Accueil/login/home_medecin/ListePatient/Info/${patient.id}`)}>Information</button>
                        <button onClick={() => confirmDeletion(patient.id)}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showConfirmation && (
        <div className="confirmation-modal_listepatient">
          <img src={supprimerImage} alt="supprimer" className="supprimer_listepatient" />
          <p>Êtes-vous sûr de vouloir supprimer ce patient ?</p>
          <button onClick={handleDeletePatient}>Oui</button>
          <button onClick={() => setShowConfirmation(false)}>Non</button>
        </div>
      )}
      {selectedPatient && (
        <div className="right_listepatient">
          <h2>Informations du Patient</h2>
          <p>Nom: {selectedPatient.nom}</p>
          <p>Prénom: {selectedPatient.prenom}</p>
          {/* Afficher d'autres informations du patient ici */}
        </div>
      )}
    </div>
  );
}

export default Listepatient;
