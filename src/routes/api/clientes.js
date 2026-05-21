const router = require('express').Router();
const { getAll, create } = require('../../controllers/clientes.controller');

// Rutas de /api/clientes
router.get('/', getAll);
router.post('/', create);

module.exports = router;