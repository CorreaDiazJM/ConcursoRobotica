const express = require('express');
const ModalidadesController = require("../controllers/modalidades");
const { checkLogin } = require('../middleware/auth');

const router = express.Router();

const error = {};


router.get('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;
    
    if (rol === 'Administrador' || rol === 'Editor' || rol === 'Espectador') {
        await ModalidadesController.mostrar()
            .catch((err) => res.send(err))
            .then((modalidades) => res.send(modalidades));
    }
});

// VISTAS

router.post('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Editor' || rol === 'Administrador') {
        if (req.body.modalidad) {
            await ModalidadesController.insertar(req.body.modalidad)
                .catch((message) => {
                    error.message = message;

                    res.render('ingresarModalidad', {
                        title: 'Ingresar Modalidad',
                        error: (error.message)? error.message : ''
                    });
                })
                .then(() => {
                    ModalidadesController.mostrarModalidad(req.body.modalidad)
                        .catch((err) => res.send(err))
                        .then(() => {
                            error.message = '';

                            res.redirect('/categorias/porModalidad');
                        });
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

router.get('/ingresar', checkLogin, (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Editor' || rol === 'Administrador') {
        res.render('ingresarModalidad', {
            title: 'Ingresar Modalidad',
            error: (error.message)? error.message : ''
        });
    } else {
        res.status(401).render('prohibido', { title: 'Error' });
    }
});


module.exports = router;
