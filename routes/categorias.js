const express = require('express');
const CategoriasController = require('../controllers/categorias');
const ModalidadesController = require('../controllers/modalidades');
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

    if (rol === 'Espectador' || rol === 'Editor' || rol === 'Administrador') {
        await CategoriasController.mostrar()
            .catch((err) => res.send(err))
            .then((categorias) => res.send(categorias));
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

router.get('/ingresar', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Editor' || rol === 'Administrador') {
        await ModalidadesController.mostrar()
            .catch((err) => res.send(err))
            .then((modalidades) => {
                res.render('ingresarCategoria', {
                    title: 'Ingresar Categoría',
                    error: (error.message)? error.message : '',
                    modalidades
                });
            });

    } else {
        res.status(401).render('prohibido', { title: 'Error' });
    }
});

router.get('/cambiar/:idCategoria', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        await CategoriasController.mostrarCategoriaPorId(req.params.idCategoria)
            .catch((message) => res.send({ message }))
            .then((categoria) => {
                ModalidadesController.mostrar()
                    .catch((err) => res.send(err))
                    .then((modalidades) => {
                        res.render('actualizarCategoria', {
                            title: 'Editar Categoría',
                            id: categoria.id,
                            categoria: categoria.categoria,
                            idModalidad: categoria.id_mod,
                            error: (error.message)? error.message : '',
                            modalidades
                        });
                    });
            });
    } else {
        res.status(401).render('prohibido', { title: 'Error' });
    }
});

router.post('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Editor' || rol === 'Administrador') {
        if (req.body.categoria && req.body.modalidad) {
            const { categoria, modalidad } = req.body;

            await CategoriasController.insertar(categoria, modalidad)
                .catch((message) => {
                    error.message = message;
                    res.redirect('/categorias/ingresar');
                })
                .then(() => {
                    CategoriasController.mostrarCategoria(categoria)
                        .catch((err) => res.send(err))
                        .then(() => res.redirect('/categorias/porModalidad'));
                });
        } else {
            res.status(400).json({
                message: 'Error en los datos de entrada'
            });
        }
    } else {
        res.status(401).render('prohibido', { title: 'Error' });
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
                    .then(() => res.redirect('/categorias/porModalidad'));
            });
    } else {
        res.status(401).render('prohibido', { title: 'Error' });
    }
});

router.put('/:idCategoria', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        if (req.body.categoria && req.body.modalidad) {
            const { categoria, modalidad } = req.body;
    
            await CategoriasController.editar(req.params.idCategoria, categoria, modalidad)
                .catch((message) => {
                    ModalidadesController.mostrar()
                        .catch((err) => res.send(err))
                        .then((modalidades) => {
                            error.message = message;
        
                            res.render('actualizarCategoria', {
                                title: 'Editar Categoría',
                                error: (error.message)? error.message : '',
                                id: req.params.idCategoria,
                                idModalidad: modalidad,
                                categoria,
                                modalidades
                            });
                        });
                })
                .then(() => {
                    CategoriasController.mostrarCategoria(categoria)
                        .catch((err) => res.send(err))
                        .then(() => res.redirect('/categorias/porModalidad'));
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


module.exports = router;
