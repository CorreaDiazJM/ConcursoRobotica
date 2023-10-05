let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('Mostrar todos los equipos');
});

router.get('/:id', (req, res) => {
    res.send('Mostrar equipo ' + req.params.id);
})

module.exports = router;
