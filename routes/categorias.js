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
            .catch((err) => res.send(err))
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
    res.send(CategoriasController.mostrar());
});

router.delete('/:idCategoria', (req, res) => {
    if (CategoriasController.existeCategoria(req.params.idCategoria)) {
        CategoriasController.eliminar(req.params.idCategoria);
        res.send(CategoriasController.mostrar());
    } else {
        res.status(404).json({
            message: 'No existe esa categoria'
        });
    }
})

module.exports = router;
