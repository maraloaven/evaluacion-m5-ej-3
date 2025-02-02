import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2 className="text-center">Panel de Administración</h2>
      <div className="text-center">
        <button className="btn btn-danger" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
      <p className="text-center mt-4">
        Bienvenido al panel de administración. Aquí puedes gestionar los registros médicos y ver las citas.
      </p>
    </div>
  );
};

export default Dashboard;
