import React from 'react';
import dr1 from "../assets/dr1.jpg";
import dr2 from "../assets/dr2.jpg";

const Doctors = () => {
  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Simi', 
      specialty: 'Cardiología', 
      experience: 10,
      image: dr1
    },
    { 
      id: 2, 
      name: 'Dra. Polo', 
      specialty: 'Pediatría', 
      experience: 8,
      image: dr2
    }
  ];

  return (
    <div className="container">
      <h2 className="text-center mb-4">Nuestros Médicos</h2>
      <div className="row">
        {doctors.map(doctor => (
          <div key={doctor.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <img 
                src={doctor.image} 
                className="card-img-top" 
                alt={doctor.name}
                style={{
                  height: "300px",
                  objectFit: "cover"
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text">
                  <strong>Especialidad:</strong> {doctor.specialty}
                </p>
                <p className="card-text">
                  <strong>Años de experiencia:</strong> {doctor.experience}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;