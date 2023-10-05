let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Mostrar todas las modalidades');
});

module.exports = router;
