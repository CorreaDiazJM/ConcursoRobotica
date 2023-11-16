const express = require('express');
const EquiposController = require('../controllers/equipo');

let router = express.Router();


router.post('/', (req, res) => {
    if (req.body.equipo && req.body.patrocinador) {
        const { equipo, patrocinador } = req.body;

        EquiposController.insertar(equipo, patrocinador)
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

router.post('/inscribir', (req, res) => {
    if (req.body.equipo && req.body.categoria) {
        const { equipo, categoria } = req.body;

        EquiposController.inscribirEnCategoria(equipo, categoria)
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

router.get('/', (req, res) => {
    EquiposController.mostrar()
        .catch((err) => res.send(err))
        .then((equipos) => res.send(equipos));
});

router.get('/:idCategoria', (req, res) => {
    EquiposController.mostrarEquiposPorCategoria(req.params.idCategoria)
        .catch((message) => res.status(400).send({ message }))
        .then((equipos) => res.send(equipos));
});

router.delete('/inscripcion', (req, res) => {
    if (req.body.equipo && req.body.categoria) {
        const { equipo, categoria } = req.body;

        EquiposController.eliminarInscripcion(equipo, categoria)
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

router.delete('/:idEquipo', (req, res) => {
    EquiposController.eliminar(req.params.idEquipo)
        .catch((message) => res.status(400).send({ message }))
        .then(() => {
            EquiposController.mostrar()
                .catch((err) => res.send(err))
                .then((equipos) => res.send(equipos));
        });
});

router.put('/:idEquipo', (req, res) => {
    if (req.body.equipo) {
        EquiposController.editar(req.params.idEquipo, req.body.equipo)
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
