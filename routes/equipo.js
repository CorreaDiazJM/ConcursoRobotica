const express = require('express');
const EquiposController = require('../controllers/equipo');
const { checkLogin } = require('../middleware/auth');

const router = express.Router();


router.post('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Editar' || rol === 'Administrador') {
        if (req.body.equipo && req.body.patrocinador) {
            const { equipo, patrocinador } = req.body;

            await EquiposController.insertar(equipo, patrocinador)
                .catch((message) => res.status(400).send({ message }))
                .then(() => {
                    EquiposController.mostrarEquipo(req.body.equipo)
                        .catch((err) => res.send(err))
                        .then((equipo) => res.status(201).send(equipo));
                });
        } else {
            res.status(400).json({
                message: 'Error en los datos de entrada'
            });
        }
    } else {
        res.status(401).json({
            message: 'Acceso no permitido'
        });
    }
});

router.post('/inscribir', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Editar' || rol === 'Administrador') {
        if (req.body.equipo && req.body.categoria) {
            const { equipo, categoria } = req.body;
    
            await EquiposController.inscribirEnCategoria(equipo, categoria)
                .catch((message) => res.status(400).send({ message }))
                .then(() => {
                    EquiposController.mostrarCategoriasInscritas(equipo)
                        .catch((err) => res.status(400).send(err))
                        .then((inscripciones) => res.status(201).send(inscripciones));
                });
        } else {
            res.status(400).json({
                message: 'Error en los datos de entrada'
            });
        }
    } else {
        res.status(401).json({
            message: 'Acceso no permitido'
        });
    }
});

router.get('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador' || rol === 'Editor' || rol === 'Espectador') {
        await EquiposController.mostrar()
            .catch((err) => res.send(err))
            .then((equipos) => res.send(equipos));
    }
});

router.get('/:idCategoria', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador' || rol === 'Editor' || rol === 'Espectador') {
        await EquiposController.mostrarEquiposPorCategoria(req.params.idCategoria)
            .catch((message) => res.status(400).send({ message }))
            .then((equipos) => res.send(equipos));
    }
});

router.delete('/inscripcion', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        if (req.body.equipo && req.body.categoria) {
            const { equipo, categoria } = req.body;
    
            await EquiposController.eliminarInscripcion(equipo, categoria)
                .catch((message) => res.status(400).send({ message }))
                .then(() => {
                    EquiposController.mostrarCategoriasInscritas(equipo)
                        .catch((err) => res.send(err))
                        .then((inscripciones) => res.send(inscripciones));
                });
        } else {
            res.status(400).json({
                message: 'Error en los datos de entrada'
            });
        }
    } else {
        res.status(401).json({
            message: 'Acceso no permitido'
        });
    }
});

router.delete('/:idEquipo', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        await EquiposController.eliminar(req.params.idEquipo)
            .catch((message) => res.status(400).send({ message }))
            .then(() => {
                EquiposController.mostrar()
                    .catch((err) => res.send(err))
                    .then((equipos) => res.send(equipos));
            });
    } else {
        res.status(401).json({
            message: 'Acceso no permitido'
        });
    }
});

router.put('/:idEquipo', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        if (req.body.equipo && req.body.patrocinador) {
            const { equipo, patrocinador } = req.body;
    
            await EquiposController.editar(req.params.idEquipo, equipo, patrocinador)
                .catch((message) => res.status(400).send({ message }))
                .then(() => {
                    EquiposController.mostrarEquipo(equipo)
                        .catch((err) => res.send(err))
                        .then((equipo) => res.send(equipo));
                });
        } else {
            res.status(400).json({
                message: 'Error en los datos de entrada'
            });
        }
    } else {
        res.status(401).json({
            message: 'Acceso no permitido'
        });
    }
});

// VISTAS

router.get('/inscripciones', checkLogin, async (req, res) => {
    await EquiposController.mostrarInscripciones()
        .catch((err) => res.send(err))
        .then((equipos) => res.render('inscripciones', {
            title: 'Inscripciones',
            equipos
        }));
});

module.exports = router;
