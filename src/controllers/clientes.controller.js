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

const create = async (req, res) => {
    // req.body -> nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni
    const result = await ClienteModel.insert(req.body);
    const nuevoCliente = await ClienteModel.selectById(result.insertId); // insertId es la propiedad que devuelve el id del nuevo cliente insertado en la base de datos.
    
    if (!nuevoCliente) {
        return res.status(404).json({ error: 'No existe el cliente con ese ID' });
    }
    res.status(201).json(nuevoCliente);
}

const remove = async (req, res) => {
    try {
        const { clienteId } = req.params; 

        // 1. Buscamos al cliente
        const cliente = await ClienteModel.selectById(clienteId); 

        // 2. Si no existe (es null), respondemos 404 y paramos la ejecución
        if (!cliente) {
            return res.status(404).json({ error: 'No existe ningún cliente con ese ID' });
        }

        // 3. Si existe, lo borramos
        await ClienteModel.deleteById(clienteId);

        // 4. Respondemos con éxito
        res.json({
            message: 'Cliente eliminado correctamente',
            clienteDeleted: cliente
        });

    } catch (error) {
        console.error('Error al borrar cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}




module.exports = {
    getAll, 
    create,
    remove
}

