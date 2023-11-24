const PatrocinadoresController = require("../controllers/patrocinadores");
const express = require('express');
const { checkLogin } = require("../middleware/auth");

const router = express.Router();

const error = {};


router.get('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Espectador' || rol === 'Editor' || rol === 'Administrador') {
        await PatrocinadoresController.mostrar()
            .catch((err) => res.send(err))
            .then((patrocinadores) => res.send(patrocinadores));
    }
});

// VISTAS

router.get('/equiposPatrocinados', checkLogin, async (req, res) => {
    await PatrocinadoresController.mostrarEquiposPatrocinados()
        .catch((err) => res.send(err))
        .then((equipos) => res.render('patrocinadores', {
            title: 'Patrocinadores',
            equipos
        }));
});

router.get('/ingresar', checkLogin, async (req, res) => {
    const { rol } = req.token_data;
    
    if (rol === 'Administrador' || rol === 'Editor') {
        res.render('ingresarPatrocinador', {
            title: 'Ingresar Patrocinador',
            error: ''
        });
    } else {
        res.render('prohibido', { title: 'Error' });
    }
});

router.post('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;
    
    if (rol === 'Administrador' || rol === 'Editor') {
        if (req.body.patrocinador) {
            await PatrocinadoresController.insertar(req.body.patrocinador)
                .catch((message) => {
                    error.message = message;

                    res.render('ingresarPatrocinador', {
                        title: 'Ingresar Patrocinador',
                        error: (error.message)? error.message : ''
                    });
                })
                .then(() => {
                    PatrocinadoresController.mostrarPatrocinador(req.body.patrocinador)
                        .catch((err) => res.send(err))
                        .then(() => res.redirect('/patrocinadores/equiposPatrocinados'));
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


module.exports = router;
