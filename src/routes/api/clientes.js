const router = require('express').Router();
const { getAll, create, remove } = require('../../controllers/clientes.controller');

// Rutas de /api/clientes
router.get('/', getAll);
router.post('/', create);
router.delete('/:clienteId', remove);

module.exports = router;