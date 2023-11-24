const express = require('express');
const ParticipantesController = require("../controllers/participantes");
const EquiposController = require('../controllers/equipo');
const { checkLogin } = require('../middleware/auth');

const router = express.Router();

const error = {};


router.use((req, res, next) => {
    if (req.query._method === 'DELETE') {
        req.method = 'DELETE';
        req.url = req.path;
    } else if (req.query._method === 'PUT') {
        req.method = 'PUT';
        req.url = req.path;
    }

    next(); 
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

router.get('/ingresar', checkLogin, async (req, res) => {
    const { rol } = req.token_data;
    
    if (rol === 'Administrador' || rol === 'Editor') {
        await EquiposController.mostrar()
            .catch((err) => res.send(err))
            .then((equipos) => {
                res.render('ingresarParticipante', {
                    title: 'Ingresar Participante',
                    error: '',
                    equipos
                });
            });
    } else {
        res.render('prohibido', { title: 'Error' });
    }
});

router.get('/cambiar/:idParticipante', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        await ParticipantesController.mostrarParticipantePorId(req.params.idParticipante)
            .catch((message) => res.send({ message }))
            .then((participante) => {
                EquiposController.mostrar()
                    .catch((err) => res.send(err))
                    .then((equipos) => {
                        res.render('actualizarParticipante', {
                            title: 'Editar Participante',
                            id: participante.id,
                            idEquipo: participante.id_equ,
                            nombre: participante.nombre,
                            apellido: participante.apellido,
                            error: (error.message)? error.message : '',
                            equipos
                        });
                    });
            });
    } else {
        res.status(401).render('prohibido', { title: 'Error' });
    }
});

router.post('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador' || rol === 'Editor') {
        if (req.body.nombre && req.body.apellido && req.body.equipo) {
            const { nombre, apellido, equipo } = req.body;
    
            await ParticipantesController.insertar(nombre, apellido, equipo)
                .catch((message) => {
                    EquiposController.mostrar()
                        .catch((err) => res.send(err))
                        .then((equipos) => {
                            error.message = message;
        
                            res.render('ingresarParticipante', {
                                title: 'Ingresar Participante',
                                error: (error.message)? error.message : '',
                                equipos
                            });
                        });
                })
                .then(() => {
                    ParticipantesController.mostrarParticipante(nombre, apellido, equipo)
                        .catch((err) => res.send(err))
                        .then(() => res.redirect('/participantes/porEquipo'));
                });
        } else {
            res.status(400).json({
                message: 'Error en los datos de entrada'
            });
        }
    } else {
        res.render('prohibido', { title: 'Error' });
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
                    .then(() => res.redirect('/participantes/porEquipo'));
            });
    } else {
        res.render('prohibido', { title: 'Error' });
    }
});

router.put('/:idParticipante', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        if (req.body.nombre && req.body.apellido && req.body.equipo) {
            const { nombre, apellido, equipo } = req.body;
    
            await ParticipantesController.editar(req.params.idParticipante, nombre, apellido, equipo)
                .catch((message) => {
                    error.message = message;
                    res.redirect('/participantes/cambiar/' + req.params.idParticipante);
                })
                .then(() => {
                    ParticipantesController.mostrarParticipante(nombre, apellido, equipo)
                        .catch((err) => res.send(err))
                        .then(() => res.redirect('/participantes/porEquipo'));
                });
        } else {
            res.status(400).json({
                message: 'Error en los datos de entrada'
            });
        }
    } else {
        res.render('prohibido', { title: 'Error' });
    }
});


module.exports = router;
