import "../styles/FormLogin.css";
import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import logo from "../images/logo.png";
import doctor from "../images/doctor.png";
import axios from "axios"; // Importez Axios
import RegisterPatient from "../pages/RegisterPatient";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idmed_id, setIdmed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Ajoutez une variable d'état pour stocker l'erreur

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Réinitialiser l'erreur lors de la soumission du formulaire

    try {
      const res = await api.post("/api/user/login/", { email, password });
      console.log('API Response:', res.data);

      if ('role' in res.data) {
        if (res.data.role === 'MEDECIN') {
          navigate(`/Accueil/login/home_medecin/${res.data.idmed_id}`, { state: { idmed_id: res.data.idmed_id } });
          setIdmed(res.data.idmed_id);
        } else if (res.data.role === 'PATIENT') {
          navigate(`/Accueil/loginpatient/home_patient/${res.data.id_pat}`);
        }
      } else {
        throw new Error("La structure de la réponse de l'API est incorrecte.");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Vous n'êtes pas encore inscrit. Veuillez vous inscrire pour accéder.");
      } else {
        setError("Erreur lors de la connexion : " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container_loginmed">
      <div className='title_connection_loginmed'>Se connecter à votre compte</div>
      <div className="sous-container_loginmed">
        <div className="left_loginmed">
          <img src={logo} alt="logo" className="logo_loginmed" />
          <img src={doctor} alt="man" className="doctor_loginmed" />
        </div>
        <div className="right_loginmed">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Nom de l'utilisateur:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="submit_loginmed">
              <button type="submit" disabled={loading}>Se connecter</button>
            </div>
          </form>
          {error && (
            <div className="error_message">
              {error}
              {error === "Vous n'êtes pas encore inscrit. Veuillez vous inscrire pour accéder." && (
                <button className="register-button" onClick={() => navigate ("/Accueil/register")}>S'inscrire</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
