import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from "../pages/NavBar";

const ParentComponent = () => {
  const { state } = useLocation();
  const idmedId = state ? state.idmed_id : null;
  const navigate = useNavigate();

  return (
    <div>
      <NavBar idMedId={idmedId} navigate={navigate} />
      {/* Autres composants et contenu de la page */}
    </div>
  );
}

export default ParentComponent;
