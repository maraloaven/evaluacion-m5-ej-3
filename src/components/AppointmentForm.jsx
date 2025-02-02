import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    doctor: "",
    date: ""
  });
  const [doctors, setDoctors] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve([
                { name: "Dr. Simi", specialty: "Cardiología" },
                { name: "Dra. Polo", specialty: "Pediatría" },
              ]),
            1000
          )
        );
        setDoctors(response);
      } catch (error) {
        setApiError("Error al cargar la lista de doctores: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patientName.trim()) {
      newErrors.patientName = "El nombre es requerido";
    } else if (formData.patientName.length < 2) {
      newErrors.patientName = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.email) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingrese un correo válido";
    }

    if (!formData.doctor) {
      newErrors.doctor = "Debe seleccionar un doctor";
    }

    if (!formData.date) {
      newErrors.date = "Debe seleccionar una fecha";
    } else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate < now) {
        newErrors.date = "La fecha debe ser futura";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!validateForm()) {
        throw new Error("Por favor, corrija los errores del formulario");
      }

      const sanitizedData = Object.keys(formData).reduce((acc, key) => {
        acc[key] = DOMPurify.sanitize(formData[key]);
        return acc;
      }, {});

      const newAppointment = {
        id: Date.now(),
        full_name: sanitizedData.patientName,
        doctor: sanitizedData.doctor,
        datetime: sanitizedData.date,
        time: new Date(sanitizedData.date).toLocaleTimeString(),
        state: "Pendiente",
        email: sanitizedData.email,
      };

      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Cita creada:", newAppointment);
      
      // Resetear formulario
      setFormData({
        patientName: "",
        email: "",
        doctor: "",
        date: ""
      });
      setErrors({});
      
      alert("Cita agendada exitosamente");
      navigate("/appointments");
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Agendar Cita</h2>
      
      {apiError && (
        <div className="alert alert-danger mb-4">
          {apiError}
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre Completo</label>
              <input
                type="text"
                className={`form-control ${errors.patientName ? 'is-invalid' : ''}`}
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
              {errors.patientName && (
                <div className="invalid-feedback">
                  {errors.patientName}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Médico</label>
              <select
                className={`form-control ${errors.doctor ? 'is-invalid' : ''}`}
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un médico</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor.name}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
              {errors.doctor && (
                <div className="invalid-feedback">
                  {errors.doctor}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha y Hora</label>
              <input
                type="datetime-local"
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              {errors.date && (
                <div className="invalid-feedback">
                  {errors.date}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Agendando..." : "Agendar Cita"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;