const express = require('express');
const EquiposController = require('../controllers/equipo');

const router = express.Router();


router.post('/', async (req, res) => {
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
});

router.post('/inscribir', async (req, res) => {
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
});

router.get('/', async (req, res) => {
    await EquiposController.mostrar()
        .catch((err) => res.send(err))
        .then((equipos) => res.send(equipos));
});

// NUEVA RUTA
router.get('/inscripciones', async (req, res) => {
    await EquiposController.mostrarInscripciones()
        .catch((err) => res.send(err))
        .then((equipos) => res.render('inscripciones', {
            title: 'Inscripciones',
            equipos
        }));
});

router.get('/:idCategoria', async (req, res) => {
    await EquiposController.mostrarEquiposPorCategoria(req.params.idCategoria)
        .catch((message) => res.status(400).send({ message }))
        .then((equipos) => res.send(equipos));
});

router.delete('/inscripcion', async (req, res) => {
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
});

router.delete('/:idEquipo', async (req, res) => {
    await EquiposController.eliminar(req.params.idEquipo)
        .catch((message) => res.status(400).send({ message }))
        .then(() => {
            EquiposController.mostrar()
                .catch((err) => res.send(err))
                .then((equipos) => res.send(equipos));
        });
});

router.put('/:idEquipo', async (req, res) => {
    if (req.body.equipo) {
        await EquiposController.editar(req.params.idEquipo, req.body.equipo)
            .catch((message) => res.status(400).send({ message }))
            .then(() => {
                EquiposController.mostrarEquipo(req.body.equipo)
                    .catch((err) => res.send(err))
                    .then((equipo) => res.send(equipo));
            });
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});


module.exports = router;
