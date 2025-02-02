import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AppointmentsList from "../pages/AppointmentsList";
import AppointmentForm from "../components/AppointmentForm";
import Services from "../pages/Services";
import Doctors from "../pages/Doctors";

const AppRoutes = () => {
  const { isAuthenticated, logout, userRole } = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Clínica Clínica</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Inicio</Link>
            <Link className="nav-link" to="/services">Servicios</Link>
            <Link className="nav-link" to="/doctors">Médicos</Link>
            <Link className="nav-link" to="/appointments/new">Agendar Cita</Link>
            
            {isAuthenticated && userRole === "ADMIN" && (
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            )}
            
            {isAuthenticated ? (
              <>
                <Link className="nav-link" to="/appointments">Mis Citas</Link>
                <button className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
              </>
            ) : (
              <Link className="nav-link" to="/login">Iniciar Sesión</Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments/new" element={<AppointmentForm />} />
        
        {isAuthenticated && (
          <>
            {userRole === "ADMIN" && (
              <Route path="/dashboard" element={<Dashboard />} />
            )}
            <Route path="/appointments" element={<AppointmentsList />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;