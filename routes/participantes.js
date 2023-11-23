const express = require('express');
const ParticipantesController = require("../controllers/participantes");
const { checkLogin } = require('../middleware/auth');

const router = express.Router();


router.post('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador' || rol === 'Editor') {
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
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.put('/:idParticipante', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
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
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.delete('/:idParticipante', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        await ParticipantesController.eliminar(req.params.idParticipante)
            .catch((message) => res.status(400).send({ message }))
            .then(() => {
                ParticipantesController.mostrar()
                    .catch((err) => res.send(err))
                    .then((participantes) => res.send(participantes));
            });
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.get('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador' || rol === 'Editor' || rol === 'Espectador') {
        await ParticipantesController.mostrar()
            .catch((err) => res.send(err))
            .then((participantes) => res.send(participantes));
    }
});

// VISTAS

router.get('/porEquipo', checkLogin, async (req, res) => {
    await ParticipantesController.mostrarParticipantesPorEquipo()
        .catch((message) => res.status(400).send({ message }))
        .then((equipos) => res.render('participantes', {
            title: 'Equipos',
            equipos
        }));
});


module.exports = router;
