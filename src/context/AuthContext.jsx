import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);

  const generateToken = (role) => {
    return btoa(JSON.stringify({
      role,
      exp: Date.now() + 3600000 // expiración de 1 hora
    }));
  };

  const validateToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token));
      return decoded.exp > Date.now();
    } catch {
      return false;
    }
  };

  const login = (role) => {
    const newToken = generateToken(role);
    setIsAuthenticated(true);
    setUserRole(role);
    setToken(newToken);
    
    localStorage.setItem('token', newToken);
    localStorage.setItem('userRole', role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedToken && validateToken(storedToken)) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setToken(storedToken);
    } else {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      token,
      login, 
      logout,
      validateToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);