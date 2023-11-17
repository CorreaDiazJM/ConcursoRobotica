const express = require('express');
const ParticipantesController = require("../controllers/participantes");

const router = express.Router();

// NUEVA RUTA
router.get('/porEquipo', async (req, res) => {
    await ParticipantesController.mostrarParticipantesPorEquipo()
        .catch((message) => res.status(400).send({ message }))
        .then((equipos) => res.render('participantes', {
            title: 'Equipos',
            equipos
        }));
});

router.post('/', async (req, res) => {
    if (req.body.nombre && req.body.apellido && req.body.equipo) {
        const { nombre, apellido, equipo } = req.body;

        await ParticipantesController.insertar(nombre, apellido, equipo)
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

router.put('/:idParticipante', async (req, res) => {
    if (req.body.nombre && req.body.apellido && req.body.equipo) {
        const { nombre, apellido, equipo } = req.body;

        await ParticipantesController.editar(req.params.idParticipante, nombre, apellido, equipo)
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

router.delete('/:idParticipante', async (req, res) => {
    await ParticipantesController.eliminar(req.params.idParticipante)
        .catch((message) => res.status(400).send({ message }))
        .then(() => {
            ParticipantesController.mostrar()
                .catch((err) => res.send(err))
                .then((participantes) => res.send(participantes));
        });
});

router.get('/', async (req, res) => {
    await ParticipantesController.mostrar()
        .catch((err) => res.send(err))
        .then((participantes) => res.send(participantes));
});


module.exports = router;
