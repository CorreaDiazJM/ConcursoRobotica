const express = require('express');
const CategoriasController = require('../controllers/categorias');

let router = express.Router();


router.post('/', (req, res) => {
    if (req.body.categoria && req.body.modalidad) {
        const { categoria, modalidad } = req.body;

        CategoriasController.insertar(categoria, modalidad)
            .catch((message) => res.status(400).send({ message }))
            .then(() => {
                CategoriasController.mostrarCategoria(categoria)
                    .catch((err) => res.send(err))
                    .then((categoria) => res.status(201).send(categoria));
            });
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.put('/:idCategoria', (req, res) => {
    if (req.body.categoria && req.body.modalidad) {
        const { categoria, modalidad } = req.body;
        CategoriasController.editar(req.params.idCategoria, categoria, modalidad)
            .catch((message) => res.status(400).send({ message }))
            .then(() => {
                CategoriasController.mostrarCategoria(categoria)
                    .catch((err) => res.send(err))
                    .then((categoria) => res.status(200).send(categoria));
            });
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.get('/', (req, res) => {
    CategoriasController.mostrar()
        .catch((err) => res.send(err))
        .then((categorias) => res.send(categorias));
});

router.delete('/:idCategoria', (req, res) => {
    CategoriasController.eliminar(req.params.idCategoria)
        .catch((message) => res.status(400).send({ message }))
        .then(() => {
            CategoriasController.mostrar()
                .catch((err) => res.send(err))
                .then((categorias) => res.send(categorias));
        });
});

//NUEVA RUTA
router.get('/porModalidad', (req, res) => {
    CategoriasController.mostrarCategoriasPorModalidad()
        .catch((err) => res.status(400).send(err))
        .then((modalidades) => res.render('modalidades', {
            title: 'Modalidades',
            modalidades
        }));

});


module.exports = router;
