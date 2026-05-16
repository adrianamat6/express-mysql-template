const router = require('express').Router();
const { getAll } = require('../../controllers/clientes.controller');

// Rutas de /api/clientes
router.get('/', getAll);

module.exports = router;