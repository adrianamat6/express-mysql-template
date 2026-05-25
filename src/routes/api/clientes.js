const router = require('express').Router();
const { getAll, getById, create, edit, remove } = require('../../controllers/clientes.controller');
const { checkClienteId } = require('../../middlewares/clientes.middleware');
const { validateSchema } = require('../../middlewares/validation.middleware');
const { clienteSchema } = require('../../schemas/clientes.schema');


// Rutas de /api/clientes
router.get('/', getAll);
router.get('/:clienteId', checkClienteId, getById);
router.post('/', validateSchema(clienteSchema), create);
router.put('/:clienteId', checkClienteId, edit); // <-- Ruta para editar un cliente, con el método HTTP PUT y el parámetro clienteId en la URL
router.delete('/:clienteId', checkClienteId, remove);
module.exports = router;