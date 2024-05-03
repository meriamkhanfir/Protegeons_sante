import "../styles/FormLoginPatient.css";

import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import logo from "../images/logo.png";
import loginpatient from "../images/loginpatient.png";
import axios from "axios"; // Importez Axios
import RegisterPatient from "../pages/RegisterPatient";
function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idmed_id, setIdmed] = useState(null);
  const [loading, setLoading] = useState(false); // Ajout de loading
  const navigate = useNavigate();

       const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Définir loading à true lors de la soumission du formulaire
         console.log("Email:", email);
         console.log("Password:", password);
        try {
          const res = await api.post("/api/user/login/", { email, password });
          console.log('API Response:', res.data);
          // Vérifier si la réponse contient les clés attendues
          if ('role' in res.data) {
             //localStorage.setItem(ACCESS_TOKEN, res.data.access);
             //localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      
            // Rediriger en fonction du rôle de l'utilisateur
            if (res.data.role === 'MEDECIN') {
              navigate(`/Accueil/login/home_medecin/${res.data.idmed_id}`, { state: { idmed_id: res.data.idmed_id } });
              console.log('ID du médecin:', res.data.idmed_id);
              setIdmed(res.data.idmed_id);
            
            } else if (res.data.role === 'PATIENT') {
              navigate(`/Accueil/loginpatient/home_patient/${res.data.id_pat}`);
              console.log('ID du patient:', res.data.id_pat);
            }
          } else {
            // Si la structure de la réponse est différente, afficher une erreur
            throw new Error("La structure de la réponse de l'API est incorrecte.");
          }
        } catch (error) {
          alert("Erreur lors de la connexion : " + error.message);
        } finally {
          setLoading(false); // Définir loading à false une fois le traitement terminé
        }
      };

  return (
    <div className="container_loginpatient ">
      <div className='title_connection_loginpatient '>Se connecter à votre compte</div>
      <div className="sous-container_loginpatient ">
        <div className="left_loginpatient ">
           <img src={logo} alt="logo" className="logo_loginpatient " />
           <img src={loginpatient} alt="man" className="doctor_loginpatient " />
        </div>
        <div className="right_loginpatient ">
          <form onSubmit={handleSubmit}>
            <label  htmlFor="email">Nom de l'utilisateur:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label   htmlFor="password">Mot de passe:</label>
            <input 
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="submit_loginpatient ">
              <button type="submit" disabled={loading}>Se connecter</button> {/* Désactiver le bouton de soumission pendant le chargement */}
            </div>
          </form>
        </div>
        
      </div>
      
    </div>
  );
}

export default FormLogin;