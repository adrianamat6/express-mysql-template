const router = require('express').Router();

// Rutas de /api
router.use('/clientes', require('./api/clientes'));

module.exports = router;