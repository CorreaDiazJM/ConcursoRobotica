const express = require('express');
const EquiposController = require('../controllers/equipo');
const PatrocinadoresController = require('../controllers/patrocinadores');
const CategoriasController = require('../controllers/categorias');
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

// VISTAS

router.get('/inscripciones', checkLogin, async (req, res) => {
    await EquiposController.mostrarInscripciones()
        .catch((err) => res.send(err))
        .then((categorias) => res.render('inscripciones', {
            title: 'Inscripciones',
            categorias
        }));
});

router.get('/ingresar', checkLogin, async (req, res) => {
    const { rol } = req.token_data;
    
    if (rol === 'Administrador' || rol === 'Editor') {
        await PatrocinadoresController.mostrar()
            .catch((err) => res.send(err))
            .then((patrocinadores) => {
                res.render('ingresarEquipo', {
                    title: 'Ingresar Equipo',
                    error: (error.message)? error.message : '',
                    patrocinadores
                });
            });
    } else {
        res.render('prohibido', { title: 'Error' });
    }
});

router.get('/inscribir', checkLogin, async (req, res) => {
    const { rol } = req.token_data;
    
    if (rol === 'Administrador' || rol === 'Editor') {
        await CategoriasController.mostrar()
            .catch((err) => res.send(err))
            .then((categorias) => {
                EquiposController.mostrar()
                    .catch((err) => res.send(err))
                    .then((equipos) => {
                        res.render('ingresarInscripcion', {
                            title: 'Inscribir Equipo',
                            error: (error.message)? error.message : '',
                            categorias,
                            equipos
                        });
                    });
            });
    } else {
        res.render('prohibido', { title: 'Error' });
    }
});

router.get('/cambiar/:idEquipo', checkLogin, async (req, res) => {
    const { rol } = req.token_data;
    const err = error;
    error.message = '';

    if (rol === 'Administrador') {
        await PatrocinadoresController.mostrar()
            .catch((message) => res.send({ message }))
            .then((patrocinadores) => {
                EquiposController.mostrarEquipoPorId(req.params.idEquipo)
                    .catch((message) => res.send(message))
                    .then((equipo) => res.render('actualizarEquipo', {
                        title: 'Editar Equipo',
                        error: (err.message)? err.message : '',
                        id: equipo.id,
                        equipo: equipo.equipo,
                        idPatrocinador: equipo.id_pat,
                        patrocinadores
                    }));
            });
    } else {
        res.render('prohibido', { title: 'Error' });
    }
});

router.post('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Editor' || rol === 'Administrador') {
        if (req.body.equipo && req.body.patrocinador) {
            const { equipo, patrocinador } = req.body;

            await EquiposController.insertar(equipo, patrocinador)
                .catch((message) => {
                    error.message = message;
                    res.redirect('/equipos/ingresar');
                })
                .then(() => {
                    EquiposController.mostrarEquipo(req.body.equipo)
                        .catch((err) => res.send(err))
                        .then(() => res.redirect('/equipos/inscripciones'));
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

router.post('/inscribir', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Editor' || rol === 'Administrador') {
        if (req.body.equipo && req.body.categoria) {
            const { equipo, categoria } = req.body;
    
            await EquiposController.inscribirEnCategoria(equipo, categoria)
                .catch((message) => {
                    error.message = message;
                    res.redirect('/equipos/inscribir');
                })
                .then(() => res.redirect('/equipos/inscripciones'));
        } else {
            res.status(400).json({
                message: 'Error en los datos de entrada'
            });
        }
    } else {
        res.render('prohibido', { title: 'Error' });
    }
});

router.put('/:idEquipo', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        if (req.body.equipo && req.body.patrocinador) {
            const { equipo, patrocinador } = req.body;
    
            await EquiposController.editar(req.params.idEquipo, equipo, patrocinador)
                .catch((message) => {
                    error.message = message;
                    res.redirect('/equipos/cambiar/' + req.params.idEquipo);
                })
                .then(() => {
                    EquiposController.mostrarEquipo(equipo)
                        .catch((err) => res.send(err))
                        .then(() => res.redirect('/equipos/inscripciones'));
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

router.delete('/inscripcion/:equipo/:categoria', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        const { equipo, categoria } = req.params;

        await EquiposController.eliminarInscripcion(equipo, categoria)
            .catch((message) => res.status(400).send({ message }))
            .then(() => {
                EquiposController.mostrarCategoriasInscritas(equipo)
                    .catch((err) => res.send(err))
                    .then(() => res.redirect('/equipos/inscripciones'));
            });
    } else {
        res.render('prohibido', { title: 'Error' });
    }
});

router.delete('/:idEquipo', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Administrador') {
        await EquiposController.eliminar(req.params.idEquipo)
            .catch((message) => res.status(400).send({ message }))
            .then(() => res.redirect('/equipos/inscripciones'));
    } else {
        res.render('prohibido', { title: 'Error' });
    }
});

// RUTAS

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


module.exports = router;
