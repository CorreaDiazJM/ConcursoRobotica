const express = require('express');
const CategoriasController = require('../controllers/categorias');
const { checkLogin } = require('../middleware/auth');

const router = express.Router();


router.post('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Editar' || rol === 'Administrador') {
        if (req.body.categoria && req.body.modalidad) {
            const { categoria, modalidad } = req.body;

            await CategoriasController.insertar(categoria, modalidad)
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
    } else {
        res.status(401).json({
            message: 'Acceso no permitido'
        });
    }
});

router.put('/:idCategoria', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        if (req.body.categoria && req.body.modalidad) {
            const { categoria, modalidad } = req.body;
    
            await CategoriasController.editar(req.params.idCategoria, categoria, modalidad)
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
    } else {
        res.status(401).json({
            message: 'Acceso no permitido'
        });
    }
});

router.get('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Espectador' || rol === 'Editor' || rol === 'Administrador') {
        await CategoriasController.mostrar()
            .catch((err) => res.send(err))
            .then((categorias) => res.send(categorias));
    }
});

router.delete('/:idCategoria', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        await CategoriasController.eliminar(req.params.idCategoria)
            .catch((message) => res.status(400).send({ message }))
            .then(() => {
                CategoriasController.mostrar()
                    .catch((err) => res.send(err))
                    .then((categorias) => res.send(categorias));
            });
    } else {
        res.status(401).json({
            message: 'Acceso no permitido'
        });
    }
});

// VISTAS

router.get('/porModalidad', checkLogin, async (req, res) => {
    await CategoriasController.mostrarCategoriasPorModalidad()
        .catch((err) => res.status(400).send(err))
        .then((modalidades) => res.render('modalidades', {
            title: 'Modalidades',
            modalidades
        }));
});


module.exports = router;
