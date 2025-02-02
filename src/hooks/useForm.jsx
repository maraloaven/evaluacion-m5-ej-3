// hooks/useForm.jsx
import { useState, useEffect } from 'react';

const useForm = (initialState = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({});

  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };

    Object.keys(fieldValues).forEach(key => {
      if (validationRules[key]) {
        const { required, pattern, custom, minLength, maxLength } = validationRules[key];
        
        if (required && !fieldValues[key]) {
          tempErrors[key] = 'Este campo es requerido';
        } else if (pattern && !pattern.test(fieldValues[key])) {
          tempErrors[key] = 'Formato inválido';
        } else if (minLength && fieldValues[key].length < minLength) {
          tempErrors[key] = `Mínimo ${minLength} caracteres`;
        } else if (maxLength && fieldValues[key].length > maxLength) {
          tempErrors[key] = `Máximo ${maxLength} caracteres`;
        } else if (custom && !custom(fieldValues[key])) {
          tempErrors[key] = 'Valor inválido';
        } else {
          delete tempErrors[key];
        }
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  useEffect(() => {
    if (isSubmitting) {
      const valid = validate();
      setIsValid(valid);
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    setTouched({
      ...touched,
      [name]: true
    });
    if (validationRules[name]) {
      validate({ [name]: value });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validate({ [name]: values[name] });
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    
    if (validate()) {
      try {
        await callback(values);
      } catch (error) {
        console.error('Error en el envío del formulario:', error);
        setErrors({
          ...errors,
          submit: 'Error al procesar el formulario. Por favor, intente nuevamente.'
        });
      }
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsValid(false);
  };

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
};

export default useForm;