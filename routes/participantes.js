const express = require('express');
const ParticipantesController = require("../controllers/participantes");

let router = express.Router();


router.post('/', (req, res) => {
    if (req.body.integrantes && req.body.categorias) {
        const { integrantes, categorias } = req.body;
        ParticipantesController.insertar(integrantes, categorias);
        res.send(ParticipantesController.mostrar());
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.put('/:idParticipante', (req, res) => {
    if (req.body.integrantes && req.body.categorias) {
        const { integrantes, categorias } = req.body;
        ParticipantesController.editar(req.params.idParticipante, integrantes, categorias);
        res.send(ParticipantesController.mostrar());
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.delete('/:idParticipante', (req, res) => {
    if (ParticipantesController.existeParticipante(req.params.idParticipante)) {
        ParticipantesController.eliminar(req.params.idParticipante);
        res.send(ParticipantesController.mostrar());
    } else {
        res.status(404).json({
            message: 'No existe el equipo participante ' + req.params.idParticipante
        });
    }
});

router.get('/', (req, res) => {
    res.send(ParticipantesController.mostrar());
});

router.get('/:idCategoria', (req, res) => {
    const inscritos = ParticipantesController.mostrarEquiposPorInscripcion(req.params.idCategoria);

    if (inscritos && inscritos.length) {
        res.send(inscritos);
    } else {
        res.json({
            message: 'No se encuentran equipos inscritos'
        });
    }
});

router.delete('/:idParticipante/:idCategoria', (req, res) => {
    if (ParticipantesController.existeParticipante(req.params.idParticipante)) {
        ParticipantesController.eliminarInscripcion(req.params.idParticipante, req.params.idCategoria);
        res.send(ParticipantesController.mostrar());
    } else {
        res.status(404).json({
            message: 'No existe el equipo participante ' + req.params.idParticipante
        });
    }
});


module.exports = router;
