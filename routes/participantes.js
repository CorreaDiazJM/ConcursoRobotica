const express = require('express');
const ParticipantesController = require("../controllers/participantes");

let router = express.Router();

// NUEVA RUTA
router.get('/porEquipo', (req, res) => {
    ParticipantesController.mostrarParticipantesPorEquipo()
        .catch((message) => res.status(400).send({ message }))
        .then((equipos) => res.render('participantes', {
            title: 'Equipos',
            equipos
        }));
});

router.post('/', (req, res) => {
    if (req.body.nombre && req.body.apellido && req.body.equipo) {
        const { nombre, apellido, equipo } = req.body;
        ParticipantesController.insertar(nombre, apellido, equipo)
            .catch((message) => res.status(400).send({ message }))
            .then(() => {
                ParticipantesController.mostrarParticipante(nombre, apellido, equipo)
                    .catch((err) => res.send(err))
                    .then((participante) => res.status(201).send(participante));
            });
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.put('/:idParticipante', (req, res) => {
    if (req.body.nombre && req.body.apellido && req.body.equipo) {
        const { nombre, apellido, equipo } = req.body;
        ParticipantesController.editar(req.params.idParticipante, nombre, apellido, equipo)
            .catch((message) => res.status(400).send({ message }))
            .then(() => {
                ParticipantesController.mostrarParticipante(nombre, apellido, equipo)
                    .catch((err) => res.send(err))
                    .then((participante) => res.send(participante));
            });
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.delete('/:idParticipante', (req, res) => {
    ParticipantesController.eliminar(req.params.idParticipante)
        .catch((message) => res.status(400).send({ message }))
        .then(() => {
            ParticipantesController.mostrar()
                .catch((err) => res.send(err))
                .then((participantes) => res.send(participantes));
        });
});

router.get('/', (req, res) => {
    ParticipantesController.mostrar()
        .catch((err) => res.send(err))
        .then((participantes) => res.send(participantes));
});


module.exports = router;
