const express = require('express');
const UsuariosController = require("../controllers/usuarios");
const { checkLogin } = require('../middleware/auth');

const router = express.Router();

const error = {};


router.get('/registrar', async (req, res) => {
    const message = error.message;
    error.message = '';

    res.render('registrar', {
        title: 'Registrar',
        error: message
    });
});

router.post('/registrar', async (req, res) => {
    if (req.body.usuario && req.body.nombre && req.body.rol && req.body.password) {
        const { usuario, nombre, rol, password } = req.body;

        await UsuariosController.insertar(usuario, nombre, rol, password)
            .catch((message) => {
                error.message = message;
                res.redirect('/usuarios/registrar');
            })
            .then((token) => {
                req.headers.authorization = token;
                res.redirect('/');
            });
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.post('/login', async (req, res) => {
    if (req.body.usuario && req.body.password) {
        const { usuario, password } = req.body;
        
        await UsuariosController.login(usuario, password)
            .catch((message) => {
                error.message = message;
                res.redirect('/usuarios/login');
            })
            .then((token) => {
                req.headers.authorization = token;
                res.redirect('/');
            });
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.get('/login', async (req, res) => {
    const message = error.message;
    error.message = '';

    res.render('login', {
        title: 'Log in',
        error: message
    });
});

router.get('/', checkLogin, async (req, res) => {
    await UsuariosController.mostrar()
        .catch((message) => res.status(400).send({ message }))
        .then((usuarios) => res.render('usuarios', {
            title: 'Usuarios',
            token: '',
            usuarios
        }));
});




module.exports = router;
