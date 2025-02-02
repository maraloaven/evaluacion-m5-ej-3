import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container">
      <h2 className="text-center mb-4">Bienvenidos a la Clínica Clínica</h2>
      <p className="text-center mb-4">
        Te brindamos atención médica de calidad. Nuestro equipo de profesionales está altamente capacitado y comprometido con tu salud.
      </p>
    </div>
  );
};

export default Home;