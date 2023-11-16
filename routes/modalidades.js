const express = require('express');
const ModalidadesController = require("../controllers/modalidades");
const CategoriasController = require('../controllers/categorias');

const router = express.Router();


router.post('/', (req, res) => {
    if (req.body.modalidad) {
        ModalidadesController.insertar(req.body.modalidad)
            .catch((message) => res.status(400).send({ message }))
            .then(() => {
                ModalidadesController.mostrarModalidad(req.body.modalidad)
                    .catch((err) => res.send(err))
                    .then((modalidad) => res.status(201).send(modalidad));
            });
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.get('/', (req, res) => {
    ModalidadesController.mostrar()
        .catch((err) => res.send(err))
        .then((modalidades) => res.send(modalidades));
});


module.exports = router;
