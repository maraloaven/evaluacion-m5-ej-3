import PropTypes from "prop-types";
import ser1 from "../assets/ser1.jpg";
import ser2 from "../assets/ser2.jpg";
import ser3 from "../assets/ser3.jpg";

function ServiceList() {
  const services = [
    {
      name: "Consulta General", 
      description: "Diagnóstico integral de salud", 
      image: ser1
    },
    {
      name: "Exámenes de Laboratorio", 
      description: "Análisis precisos y rápidos", 
      image: ser2
    },
    {
      name: "Radiología", 
      description: "Tecnología de punta para diagnósticos", 
      image: ser3
    }
  ];

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2>Bienvenidos a la Clínica Clínica</h2>
        <p>
          Te brindamos atención médica de calidad. Nuestro equipo de profesionales está altamente capacitado y comprometido con tu salud.
        </p>
      </div>

      <h3 className="text-center mb-4">Servicios Destacados</h3>
      <div className="d-flex justify-content-center flex-wrap">
        {services.map((service, index) => (
          <div 
            className="card m-2" 
            key={index} 
            style={{ width: "300px" }}
          >
            <img
              src={service.image}
              alt={service.name}
              className="card-img-top"
              style={{
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{service.name}</h5>
              <p className="card-text">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceList;