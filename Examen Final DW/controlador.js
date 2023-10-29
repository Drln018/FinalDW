// Importación del modelo Paciente
const Paciente = require('./modelado');

// Objeto que contendrá las funciones para manejar los pacientes
const fichaP = {
    // Función para crear un nuevo paciente
    createPaciente: async (req, res) => {
        try {
            // Se crea un nuevo paciente utilizando los datos del cuerpo de la solicitud (req.body)
            const paciente = new Paciente(req.body);
            console.log(paciente); // Se muestra el paciente en consola (esto es opcional)

            // Se guarda el nuevo paciente en la base de datos
            const pacienteGuardado = await paciente.save();

            // Se responde con el paciente creado y un código de estado 201 (Creado)
            res.status(201).json(pacienteGuardado);
        } catch (error) {
            // Si hay un error durante la creación, se maneja devolviendo un código de estado 500 (Error interno del servidor)
            res.status(500).json({ error: 'Error al crear el paciente' });
        }
    },

    // Función para obtener todos los pacientes
    getPacientes: async (req, res) => {
        try {
            // Se buscan y recuperan todos los pacientes almacenados en la base de datos
            const pacientes = await Paciente.find();

            // Se responde con la lista de pacientes y un código de estado 200 (Éxito)
            res.status(200).json(pacientes);
        } catch (error) {
            // Si hay un error al obtener los pacientes, se maneja devolviendo un código de estado 500 (Error interno del servidor)
            res.status(500).json({ error: 'Error al obtener pacientes' });
        }
    },

    // Función para obtener un paciente por su ID
    getPacienteId: async (req, res) => {
        try {
            // Se busca un paciente por su ID proporcionado en los parámetros de la solicitud (req.params.id)
            const paciente = await Paciente.findById(req.params.id);

            if (!paciente) {
                // Si no se encuentra el paciente, se responde con un código de estado 404 (No encontrado)
                return res.status(404).json({ error: 'Paciente no encontrado' });
            }

            // Si se encuentra el paciente, se responde con la información del paciente y un código de estado 200 (Éxito)
            res.status(200).json(paciente);
        } catch (error) {
            // Si hay un error al obtener el paciente por su ID, se maneja devolviendo un código de estado 500 (Error interno del servidor)
            res.status(500).json({ error: 'Error al obtener el paciente' });
        }
    },

    // Función para actualizar un paciente por su ID
    updatePaciente: async (req, res) => {
        try {
            // Se actualiza la información del paciente basándose en el ID proporcionado en los parámetros de la solicitud
            const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!paciente) {
                // Si no se encuentra el paciente, se responde con un código de estado 404 (No encontrado)
                return res.status(404).json({ error: 'Paciente no encontrado' });
            }

            // Si se actualiza correctamente, se responde con la información del paciente actualizado y un código de estado 200 (Éxito)
            res.status(200).json(paciente);
        } catch (error) {
            // Si hay un error al actualizar el paciente, se maneja devolviendo un código de estado 500 (Error interno del servidor)
            res.status(500).json({ error: 'Error al actualizar el paciente' });
        }
    },

    // Función para eliminar un paciente por su ID
    deletePaciente: async (req, res) => {
        try {
            // Se elimina un paciente por su ID proporcionado en los parámetros de la solicitud
            const paciente = await Paciente.findByIdAndRemove(req.params.id);

            if (!paciente) {
                // Si no se encuentra el paciente, se responde con un código de estado 404 (No encontrado)
                return res.status(404).json({ error: 'Paciente no encontrado' });
            }

            // Si se elimina correctamente, se responde con un código de estado 204 (Sin contenido)
            res.status(204).send();
        } catch (error) {
            // Si hay un error al eliminar el paciente, se maneja devolviendo un código de estado 500 (Error interno del servidor)
            res.status(500).json({ error: 'Error al eliminar el paciente' });
        }
    }
};

// Se exporta el objeto fich
