const PatrocinadoresController = require("../controllers/patrocinadores");
const express = require('express');

const router = express.Router();


router.get('/', async (req, res) => {
    await PatrocinadoresController.mostrar()
        .catch((err) => res.send(err))
        .then((patrocinadores) => res.send(patrocinadores));
});

router.post('/', async (req, res) => {
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
});

//NUEVA RUTA
router.get('/equiposPatrocinados', async (req, res) => {
    await PatrocinadoresController.mostrarEquiposPatrocinados()
        .catch((err) => res.send(err))
        .then((equipos) => res.render('patrocinadores', {
            title: 'Patrocinadores',
            equipos
        }));
})

module.exports = router;
