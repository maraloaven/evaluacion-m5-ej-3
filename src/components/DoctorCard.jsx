import PropTypes from "prop-types";

function DoctorCard({ name, specialty, experience, image = "/default-doctor.png", onClick = () => {} }) {
  const cardImageStyle = {
    maxHeight: "200px",
    width: "100%",
    objectFit: "cover",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const cardBodyStyle = {
    textAlign: "center",
  };

  return (
    <div className="card h-100" onClick={onClick}>
      <img 
        src={image} 
        alt={`Foto de ${name}`} 
        style={cardImageStyle} 
        onError={(e) => {e.target.src = "/default-doctor.png"}}
      />
      <div className="card-body" style={cardBodyStyle}>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Especialidad: {specialty}</p>
        <p className="card-text">Años de experiencia: {experience}</p>
      </div>
    </div>
  );
}

DoctorCard.propTypes = {
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  experience: PropTypes.number.isRequired,
  image: PropTypes.string,
  onClick: PropTypes.func,
};

export default DoctorCard;