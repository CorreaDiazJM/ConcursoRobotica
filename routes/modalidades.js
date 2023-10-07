const express = require('express');
const ModalidadesController = require("../controllers/modalidades");
const CategoriasController = require('../controllers/categorias');

let router = express.Router();


router.post('/', (req, res) => {
    ModalidadesController.insertar(req.body)
    res.send(ModalidadesController.mostrar());
});

router.get('/', (req, res) => {
    res.send(ModalidadesController.mostrar());
});

router.get('/vista', (req, res) => {
    const modalidades = ModalidadesController.mostrar();
    const categorias = CategoriasController.mostrar();
    const title = 'Modalidades';

    res.render('modalidades', { title, modalidades, categorias });
});

module.exports = router;
