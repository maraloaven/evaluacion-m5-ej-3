import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Simulando API call
  const fetchAppointments = async () => {
    try {
      const response = await new Promise((resolve) => 
        setTimeout(() => resolve([
          { 
            id: 1, 
            full_name: "Yon", 
            doctor: "Dr. Simi", 
            datetime: "2025-01-25T10:00:00", 
            time: "10:00 AM", 
            state: "Confirmada", 
            email: "yon@example.com" 
          },
          { 
            id: 2, 
            full_name: "Yein", 
            doctor: "Dra. Polo", 
            datetime: "2025-01-26T11:00:00", 
            time: "11:00 AM", 
            state: "Pendiente", 
            email: "yein@example.com" 
          }
        ]), 1000)
      );
      setAppointments(response);
    } catch (err) {
      setError("Error al cargar las citas: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setError("Debes estar autenticado para ver las citas.");
      logout();
      navigate("/login");
      return;
    }
    fetchAppointments();
  }, [isAuthenticated, logout, navigate]);

  const handleCancelAppointment = async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAppointments(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      setError("Error al cancelar la cita: " + err.message);
    }
  };

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mis Citas</h2>
      {appointments.length === 0 ? (
        <div className="alert alert-info text-center">
          No tienes citas programadas.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Médico</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.full_name}</td>
                  <td>{appointment.doctor}</td>
                  <td>{new Date(appointment.datetime).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <span className={`badge ${
                      appointment.state === "Confirmada" ? "bg-success" : "bg-warning"
                    }`}>
                      {appointment.state}
                    </span>
                  </td>
                  <td>{appointment.email}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;