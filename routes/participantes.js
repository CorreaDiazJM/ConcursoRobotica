let express = require('express');
let router = express.Router();

/* GET equipos */
router.get('/', (req, res) => {
    res.send('Mostrar todos los equipos');
});

/* GET un equipo */
router.get('/:id', (req, res) => {
    res.send('Mostrar equipo ' + req.params.id);
});

/* DELETE equipo por id */
router.delete('/:id', (req, res) => {
    res.send('Eliminar equipo ' + req.params.id);
});

/* DELETE eliminar inscripcion a categoria */
router.delete('/:idEquipo/categoria/:idCategoria', (req, res) => {
    res.send('Eliminar incripcion ' + req.params.idCategoria + ' del equipo ' + req.params.idEquipo);
})
// Importar el controlador de participantes
const participantesController = require('../controllers/participantesController');

// Ruta para editar un participante específico
router.put('/participantes/:id', participantesController.editarParticipante);

module.exports = router;
