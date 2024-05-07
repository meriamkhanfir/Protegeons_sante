import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import logoImage from '../images/logo.png';
import accueil1Image from '../images/accueil1.jpg';
import accueil_questionImage from '../images/accueil_question.png';
import loginpatientImage from '../images/loginpatient.png';
import doctorImage from '../images/doctor copy.png';
import patient1Image from '../images/patient1.png';
import patient2Image from '../images/patient2.png';
import diabete_accueilImage from '../images/diabete_accueil.png';
import diabete_infoImage from '../images/diabete_info.png';
import diabete_accueil3Image from '../images/diabete_accueil3.png';
import diabetetype1Image from '../images/diabetetype1.png';
import diabetetype2Image from '../images/diabetetype2.png';
import recettesImage from '../images/recettes.png';
import rv_medImage from '../images/rv_med.png'
import listepatientImage from '../images/Listedespatients.png'







import '../styles/Accueil.css';

const Accueil = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };
  const navigate = useNavigate();

  
    const [showDetails, setShowDetails] = useState({
      general: false,
      type1: false,
      type2: false,
      gestational: false,
      other: false
    });
    const toggleDetails = (type) => {
      setShowDetails(prevState => ({
        ...prevState,
        [type]: !prevState[type]
      }));
    };
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
       
         <a href="#footer">Contactez-nous</a>
        
        
      </nav>
      < div className="content">
      <div className="right_accueil ">
        <div className="buttons">
          <button className="register-button" onClick={openRegisterModal}>S'inscrire</button>
          <button className="login-button" onClick={openLoginModal}>Se connecter</button>
        </div>
        <img src={accueil1Image} alt="accueil1" className='accueil1' />

        </div>
        <div className="left_accueil ">
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className='logo_accueil' />
        <h2 className='titre'>About Us : protégeons santé, qui nous sommes ?</h2>
        <p className='soustitre'> Protégeons santé invite les patients et les professionnels de la santé à faire
           équipe dans une relation de partenariat où chacun connaît et joue son rôle dans 
           la gestion des maladies chroniques.
            Que vous soyez un patient ou un professionnel,
             protégeons santé vous aidera à communiquer plus efficacement !</p></div>
             <br/>
             </div>


       
             <div className="rest_accueil ">
       

<h2 className='titre'>Pour le patient : </h2>

 <p className='soustitre'> 
 Jouez un rôle actif dans votre santé et devenez un patient plus autonome pour mieux gérer votre maladie.
  Une bonne préparation et une bonne communication avec les professionnels de la santé qui vous entourent 
  vous aideront à vivre des rencontres plus satisfaisantes! <br/>À travers ces services :
 </p><br/><br/>
 <div className='img_patient_accueil'>
  <div className="patient-info">
    <img src={patient1Image} alt="patient" className='patient1_accueil' />
    <p><br/><br/>une Agenda pour gérer les <br/>rendez-vous</p>
  </div>
  <div className="patient-info">
    <img src={patient2Image} alt="patient" className='patient2_accueil' />
    <p><br/><br/>Carnet médical électronique partagé <br/>entre le patient et ses médecins</p>
  </div>
  <div className="patient-info">
    <img src={recettesImage} alt="patient" className='patient3_accueil' />
    <p><br/><br/>Repas recommandés selon <br/>les données du carnet médical</p>
  </div>
</div>
<h2 className='titre'><br/><br/><br/>Pour le professionnel : </h2>

 <p className='soustitre'> 
 Engagez-vous à travailler en partenariat avec vos patients, les encourageant à jouer un rôle actif dans la gestion de leur santé. Une communication ouverte et empathique, ainsi qu'une collaboration transparente dans le processus de soins, permettront de construire une relation solide et de favoriser des résultats positifs pour la santé de vos patients.
  <br/>À travers ces services :<br/><br/><br/>
 </p>
 <div className='img_patient_accueil'>
  <div className="patient-info">
    <img src={rv_medImage} alt="patient" className='patient1_accueil' />
    <p><br/><br/>une Agenda pour gérer les rendez-vous</p>
  </div>
  <div className="patient-info">
    <img src={patient2Image} alt="patient" className='patient2_accueil' />
    <p><br/><br/>Carnet médical électronique partagé <br/>entre le patient et ses médecins</p>
  </div>
  <div className="patient-info">
    <img src={listepatientImage} alt="patient" className='patient3_accueil' />
    <p><br/><br/>Gestion des listes des patients </p>
  </div>
</div>
<p><br/><br/><br/><br/></p>
</div>

<div className='diabeteinfodetail_accueil'>
<div className="right_accueil1 ">
<img src={diabete_accueil3Image} alt="diabete_accueil" className='diabete_info' /> 

</div>
<div className="left_accueil1 ">

<div className='diabete_info_accueil'><p ><h3>Le diabète et vous</h3> <br/>
Vous souhaitez mieux comprendre et vous informer sur le diabète car vous ou l’un de
 vos proches est directement concerné par cette maladie.<br/><br/> </p>
 

</div>

</div>
</div>
<div className='diabeteinfodetail_accueil'>

 <div className="right_accueil2 ">

      <img src={diabete_accueilImage} alt="diabete_accueil" className='diabete_accueil' /> </div>
<div className="left_accueil2 ">
<div className='diabeteinfo_accueil'>
      <div  onClick={() => toggleDetails('general')}>
        <h2>Le diabète en général :</h2>
        {showDetails.general && (
          <p>Le diabète est une maladie chronique qui se caractérise par un taux élevé 
            de glucose dans le sang. Le glucose provient des aliments que nous consommons 
            et est la principale source d'énergie pour notre corps. L'insuline, une hormone produite
             par le pancréas, aide à transporter le glucose des aliments vers les cellules pour les 
             utiliser comme source d'énergie. Dans le diabète, soit le pancréas ne produit pas suffisamment
              d'insuline, soit les cellules du corps ne répondent pas correctement à l'insuline produite.</p>
        )}
     
      

      </div>
      </div>
      <div className='diabeteinfodetail_accueil'>

      <div className="leftt_accueil3 ">

<img src={diabetetype1Image} alt="diabete_accueil" className='diabete1_accueil' /> </div>
      <div className="right_accueil3 ">

      <div onClick={() => toggleDetails('type1')}>
        <h2>Le diabète de type 1 :</h2>
        {showDetails.type1 && (
          <p>Le diabète de type 1 est une forme de diabète qui se développe 
            lorsque le système immunitaire attaque et détruit les cellules bêta du pancréas, 
            qui sont responsables de la production d'insuline. Les personnes atteintes de diabète 
            de type 1 doivent généralement prendre de l'insuline par injection ou à l'aide d'une pompe 
            à insuline pour réguler leur taux de glucose sanguin.</p>
        )}
      </div>
      </div>
      <div className='diabeteinfodetail_accueil'>

      </div>

      <div className="right_accueil4 ">

<img src={diabetetype2Image} alt="diabete_accueil" className='diabete_accueil4' /> </div>
      <div className="left_accueil4 ">

      <div onClick={() => toggleDetails('type2')}>
        <h2>Le diabète de type 2 :</h2>
        {showDetails.type2 && (
          <p>Le diabète de type 2 est le type le plus courant de diabète. Il survient lorsque le 
            corps devient résistant à l'insuline ou lorsque le pancréas ne produit pas suffisamment 
            d'insuline pour répondre aux besoins du corps. Le diabète de type 2 est souvent associé 
            à des facteurs de risque tels que l'obésité, le manque d'activité physique et la génétique. 
            Il peut être traité par des changements de mode de vie, des médicaments oraux, et dans certains cas, 
            par l'insuline.</p>
        )}
      </div>
      </div>
    </div>
    <div className='diabeteinfodetail_accueil'>

      <div className="right_accueil5 ">

      <div onClick={() => toggleDetails('gestational')}>
        <h2>Le diabète gestationnel :</h2>
        {showDetails.gestational && (
          <p>Le diabète gestationnel se développe chez certaines femmes pendant la grossesse. 
            Il est causé par des changements hormonaux qui rendent le corps moins sensible à l'insuline. 
            Le diabète gestationnel peut généralement être contrôlé par un régime alimentaire sain et de 
            l'exercice, mais dans certains cas, un traitement médicamenteux peut être nécessaire.</p>
        )}
      </div>
      </div>
</div>
<div className='diabeteinfodetail_accueil'>

      <div className="left_accueil6 ">

      <div onClick={() => toggleDetails('other')}>
        <h2>Autres types de diabète :</h2>
        {showDetails.other && (
          <p>Il existe d'autres formes moins courantes de diabète, telles que le diabète lié à certaines
             maladies génétiques, les maladies du pancréas, les effets secondaires de certains médicaments,
              ou le diabète induit par d'autres conditions médicales. Ces types de diabète peuvent nécessiter
               des approches de traitement différentes en fonction de leur cause sous-jacente.</p>
        )}
      </div>
      </div>
      </div>
      </div>
      

    </div>
      <div className={`register-modal ${registerModalOpen ? 'open' : ''}`}>
      <div className="register-modal-content">
        <h2>Êtes-vous un médecin?</h2>
        <img src={accueil_questionImage} alt="accueil_question" className='accueil_question' />

        <div className='reponse_med'> 
        <button  onClick={() => navigate ("/Accueil/register")}>Oui</button>
        <button  onClick={closeRegisterModal}>Non</button>
        </div>
        <button onClick={closeRegisterModal} className="close-modal-button">Fermer</button>
      </div>
    </div>
    
    <div className={`login-modal ${loginModalOpen ? 'open' : ''}`}>
      <div className="login-modal-content">
        <h1>Êtes-vous</h1>
        <div className="left_accueil_doctor">
  <button onClick={() => navigate("loginpatient/")}>
    <img src={loginpatientImage} alt="loginpatient" className='loginpatient_accueil' />
  </button>
  <span>Patient</span>
</div>

<div className="right_accueil_patient">
  <button onClick={() => navigate("login/")}>
    <img src={doctorImage} alt="doctor" className='doctor_accueil' />
  </button>
  <span>Médecin</span>
</div>

        <button onClick={closeLoginModal} className="close-modal-button">Fermer</button>
      </div>
    </div>
 
    <footer id="footer" className="footer_accueil">
  <p>Pour nous soumettre toute demande d'information, pour nous faire un commentaire ou pour signaler 
    un problème technique concernant le site Protégeons Santé,
     veuillez nous écrire à <a className='email_accueil' href="mailto:info@protégeonssante.tn">info@protegeonssante.tn</a>.<br/><br/></p>
  <p>&copy; 2024 Protégeons santé. Tous droits réservés.</p>
</footer>
    

      </div>

    </div>
    
  );
}

export default Accueil;
