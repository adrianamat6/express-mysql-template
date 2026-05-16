const ClienteModel  = require('../models/clientes.model');

const getAll = async (req, res) => {
    try {
        const clientes = await ClienteModel.selectAll();
        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = {
    getAll
}

