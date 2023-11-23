const express = require('express');
const ModalidadesController = require("../controllers/modalidades");
const { checkLogin } = require('../middleware/auth');

const router = express.Router();


router.post('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    if (rol === 'Editar' || rol === 'Administrador') {
        if (req.body.modalidad) {
            await ModalidadesController.insertar(req.body.modalidad)
                .catch((message) => res.status(400).send({ message }))
                .then(() => {
                    ModalidadesController.mostrarModalidad(req.body.modalidad)
                        .catch((err) => res.send(err))
                        .then((modalidad) => res.status(201).send(modalidad));
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
    
    if (rol === 'Administrador' || rol === 'Editar' || rol === 'Espectador') {
        await ModalidadesController.mostrar()
            .catch((err) => res.send(err))
            .then((modalidades) => res.send(modalidades));
    }
});


module.exports = router;
