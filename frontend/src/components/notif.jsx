import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import '../styles/notif.css';
import api from '../api';

const Notif = ({ patientId }) => {
    const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchUpcomingAppointments();
  }, []);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchUpcomingAppointments();
    }
  };

  const fetchUpcomingAppointments = async () => {
    try {
      const response = await api.get(`/api/appointments/upcoming/${patientId}/`);
      const upcomingAppointments = response.data;
      setNotifications(upcomingAppointments);
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
    }
  };

  return (
    <div className="notification-wrapper">
      <div className="notification-icon" onClick={toggleNotifications}>
        🔔
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </div>
      {isOpen && (
        <div className="notification-container">
          <h3>Notifications</h3>
          <ul className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((appointment, index) => (
                <li key={index} onClick={() => navigate(`/Accueil/loginpatient/home_patient/Agenda/${patientId}`)}>
                  {appointment.date} à {appointment.time} - {appointment.description}
                </li>
              ))
            ) : (
              <li>Il n'y a pas de rendez-vous dans les 24 prochaines heures.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notif;
