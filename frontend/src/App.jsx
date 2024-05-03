import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import LoginPatient from "./pages/loginpatient";

import Register from "./pages/Register";
import HomeMedecin from "./pages/HomeMedecin";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPatient from "./pages/RegisterPatient";
import CreateRv from "./pages/CreateRv";
import CarnetMedical from "./pages/carnetmedicale";
import axios from 'axios';
import Listepatient from "./pages/listepatients";
import Consultation from "./components/Consultation";
import RotatingCircle from "./pages/RotatingCircle"; 
import Acceuil from "./pages/Accueil";
import HomePatient from "./pages/HomePatient";

import CarnetMedicalPat from "./components/CarnetMedicalpat";
import ChangeDoctorForm from "./components/FormChangementDoctor";
import DoctorChangeRequests from "./components/Requests";
import Agenda from "./components/AgendaPatient";


axios.defaults.withCredentials = true;

//function Logout() {
  //localStorage.clear();
 // return <Navigate to="/Accueil/login" />;
//}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RotatingCircle />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeMedecin />
            </ProtectedRoute>
          }
        />
         <Route
      path="/home"
      element={
    <ProtectedRoute>
      <HomePatient />
    </ProtectedRoute>
      }
    />
          <Route path="/Accueil" element={<Acceuil />} />
        <Route path="/Accueil/login" element={<Login />} />
        <Route path="/Accueil/loginpatient" element={<LoginPatient />} />

        <Route path="/Accueil/login/home_medecin/registerpatient/:medecinId" element={<RegisterPatient />} />
        <Route path="/Accueil/login/home_medecin/CreateRv/:medecinId" element={<CreateRv />} />
        <Route path="/Accueil/login/home_medecin/:medecinId" element={<HomeMedecin />} />
        <Route path="/Accueil/loginpatient/home_patient/:patientId" element={<HomePatient />} />

        <Route path="/Accueil/login/home_medecin/ListePatient/:medecinId" element={<Listepatient />} />
        <Route path="/Accueil/login/home_medecin/ListePatient/Info/:patientId" element={<CarnetMedical />} />
        <Route path="/Accueil/register" element={<Register />} />
        <Route path="/Accueil/login/home_medecin/consultation/:id" element={<Consultation />} />
        <Route path="/Accueil/loginpatient/home_patient/carnet_medical/:patientId" element={<CarnetMedicalPat />} />
        <Route path="/Accueil/loginpatient/home_patient/DemandeChangementDoctor/:patientId" element={<ChangeDoctorForm />} />
        <Route path="/Accueil/login/home_medecin/Requests/:medId" element={<DoctorChangeRequests />} />
        <Route path="/Accueil/loginpatient/home_patient/Agenda/:patientId" element={<Agenda />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
