# Sitio Web de la Clínica Clínica

Este es un proyecto de una aplicación web para la **Clínica Clínica**, desarrollado con **React**. La aplicación implementa un sistema de gestión de citas médicas, autenticación de usuarios y manejo de errores, siguiendo las mejores prácticas de desarrollo con React.

## Descripción del Proyecto

El sistema web contiene las siguientes características principales:

1. **Sistema de Autenticación y Autorización**:
   - Login seguro con roles diferenciados (admin y usuario).
   - Protección de rutas basada en roles.
   - Gestión de sesiones con tokens.

2. **Gestión de Citas Médicas**:
   - Formulario para agendar citas con validación de datos.
   - Listado de citas programadas con opción para cancelar.
   - Integración de datos de médicos y pacientes.

3. **Manejo de Errores**:
   - Captura y manejo de errores durante las peticiones a la API.
   - Validación de formularios con mensajes de error claros.
   - Manejo de errores comunes en la interfaz.

4. **Uso de Hooks**:
   - Implementación de `useState` para la gestión del estado en formularios y listados.
   - Uso de `useEffect` para la carga de datos y efectos secundarios.
   - Creación de un Hook personalizado (`useForm`) para la gestión de formularios.

## Tecnologías Utilizadas

- **React**: Framework principal.
- **React Router DOM**: Para la gestión de rutas protegidas.
- **Bootstrap**: Para el diseño responsivo.
- **DOMPurify**: Para la sanitización de datos.
- **Helmet**: Para headers de seguridad.
- **Hooks de React**: Para la gestión de estado y efectos secundarios.

## Funcionalidades Clave

1. **Gestión de Autenticación**:
   - Sistema de login con credenciales.
   - Manejo de tokens para la autenticación.
   - Validación de sesiones.

2. **Control de Acceso**:
   - Rutas protegidas por rol.
   - Navegación condicional basada en la autenticación.

3. **Seguridad de Datos**:
   - Sanitización de inputs para prevenir ataques XSS.
   - Validación de formularios para asegurar la integridad de los datos.

4. **Gestión de Citas**:
   - Agendamiento de citas con validación de fechas y datos.
   - Visualización y cancelación de citas programadas.

## Estructura del Proyecto

```plaintext
evaluacion-m5-ej-3
│
├── node_modules/
├── assets/
│   ├── dr1.jpg
│   ├── dr2.jpg
│   ├── dr3.jpg
│   ├── dr4.jpg
│   ├── ser1.jpg
│   ├── ser2.jpg
│   └── ser3.jpg
│
└── src/
    ├── components/
    │   ├── AppointmentForm.jsx
    │   ├── DoctorCard.jsx
    │   ├── Modal.jsx
    │   └── ServiceList.jsx
    │
    ├── context/
    │   └── AuthContext.jsx
    │
    ├── pages/
    │   ├── AppointmentsList.jsx
    │   ├── Dashboard.jsx
    │   ├── Doctors.jsx
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   └── Services.jsx
    │
    ├── routes/
    │   └── App.jsx
    │
    ├── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
```

## Instrucciones de Uso

### Credenciales de Prueba

- **Administrador**:
  - Usuario: admin
  - Contraseña: admin123

- **Usuario**:
  - Usuario: user
  - Contraseña: user123

### Pasos para Ejecutar

1. Clonar el repositorio:
```bash
git clone <URL del repositorio>
cd <nombre del repositorio>
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor:
```bash
npm run dev
```

4. Abrir http://localhost:5173 en el navegador.

# Autor

- Martín Avendaño