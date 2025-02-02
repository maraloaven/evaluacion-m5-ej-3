import React from 'react';
import ser1 from "../assets/ser1.jpg";
import ser2 from "../assets/ser2.jpg";
import ser3 from "../assets/ser3.jpg";

const Services = () => {
  const services = [
    {
      name: "Consulta General",
      description: "Diagnóstico integral de salud con nuestros profesionales más experimentados.",
      image: ser1
    },
    {
      name: "Exámenes de Laboratorio",
      description: "Análisis precisos y rápidos con tecnología de última generación.",
      image: ser2
    },
    {
      name: "Radiología",
      description: "Diagnósticos por imagen con equipos de alta precisión y profesionales especializados.",
      image: ser3
    }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Nuestros Servicios</h2>
      <div className="row">
        {services.map((service, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <img 
                src={service.image} 
                className="card-img-top" 
                alt={service.name}
                style={{
                  height: "250px",
                  objectFit: "cover"
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;