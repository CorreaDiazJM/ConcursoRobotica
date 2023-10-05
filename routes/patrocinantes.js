let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('Mostrar todos los patrocinantes');
});

router.get('/:id', (req, res) => {
    res.send('Mostrar patrociante ' + req.params.id);
})

module.exports = router;
