import React from "react";
import { Helmet } from "react-helmet";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Helmet>
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'" />
      </Helmet>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;