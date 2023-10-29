const express = require('express');
const mongoose = require('mongoose');
const { Auth, isAuthenticated } = require('./auth.js'); // Importa funciones de autenticación
const fichaP = require('./controlador.js'); // Importa funciones del controlador

const app = express(); // Inicializa la aplicación Express
app.use(express.json()); // Permite el análisis de JSON en las solicitudes HTTP
const port = 4000; // Puerto en el que se ejecutará el servidor

// Función asincrónica para conectar a la base de datos MongoDB
async function conectarDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/FinalDW', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB con Mongoose');
  } catch (error) {
    console.error('Error al conectar a MongoDB con Mongoose:', error);
  }
}
conectarDB(); // Llama a la función para conectar a la base de datos al iniciar la aplicación

// Definición de las rutas para diferentes operaciones
app.post('/registrar-usuario', Auth.register);
app.post('/login', Auth.login);
app.post('/create-paciente', fichaP.createPaciente);
app.get('/get-pacientes', fichaP.getPacientes);
app.get('/get-paciente/:id', fichaP.getPacienteId);
app.put('/update-paciente/:id', fichaP.updatePaciente);
app.delete('/delete-paciente/:id', fichaP.deletePaciente);

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(`${__dirname}/public`));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Manejo de rutas no definidas (devuelve 404 not found)
app.get('*', (req, res) => {
  res.status(404).send('404 not found');
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
