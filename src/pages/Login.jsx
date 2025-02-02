import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DOMPurify from 'dompurify'; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPassword = DOMPurify.sanitize(password);

    // Prevenir inyección SQL
    if (sanitizedUsername === "admin" && sanitizedPassword === "admin123") {
      login("ADMIN");
      navigate("/dashboard");
    } else if (sanitizedUsername === "doctor" && sanitizedPassword === "doctor123") {
      login("DOCTOR");
      navigate("/appointments");
    } else {
      setLoginError("Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Iniciar Sesión</div>
            <div className="card-body">
              {loginError && <div className="alert alert-danger">{loginError}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
              </form>
              <div className="mt-3 text-muted small">
                <strong>Usuarios de prueba:</strong>
                <p>Admin: usuario "admin", contraseña "admin123"</p>
                <p>Doctor: usuario "doctor", contraseña "doctor123"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;