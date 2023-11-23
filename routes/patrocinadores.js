const PatrocinadoresController = require("../controllers/patrocinadores");
const express = require('express');
const { checkLogin } = require("../middleware/auth");

const router = express.Router();


router.get('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Espectador' || rol === 'Editor' || rol === 'Administrador') {
        await PatrocinadoresController.mostrar()
            .catch((err) => res.send(err))
            .then((patrocinadores) => res.send(patrocinadores));
    }
});

router.post('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;
    
    if (rol === 'Administrador' || rol === 'Editor') {
        if (req.body.patrocinador) {
            await PatrocinadoresController.insertar(req.body.patrocinador)
                .catch((message) => res.status(400).send({ message }))
                .then(() => {
                    PatrocinadoresController.mostrarPatrocinador(req.body.patrocinador)
                        .catch((err) => res.send(err))
                        .then((patrocinador) => res.status(201).send(patrocinador));
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

//NUEVA RUTA
router.get('/equiposPatrocinados', checkLogin, async (req, res) => {
    await PatrocinadoresController.mostrarEquiposPatrocinados()
        .catch((err) => res.send(err))
        .then((equipos) => res.render('patrocinadores', {
            title: 'Patrocinadores',
            equipos
        }));
})

module.exports = router;
