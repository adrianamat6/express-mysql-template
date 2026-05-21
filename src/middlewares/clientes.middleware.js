const ClientesModel = require('../models/clientes.model');  

const checkClienteId = async (req, res, next) => {
    const { clienteId } = req.params;
    
    // 1. Comprobamos si no es un número válido
    if (isNaN(clienteId)) {
        return res.status(400).json({ message: 'El ID del cliente no es un número válido' });
    }

    try {
        // 2. Comprobamos si el cliente existe en la base de datos
        const cliente = await ClientesModel.selectById(clienteId); 
        if (!cliente) {
            return res.status(404).json({ message: 'No existe ningún cliente con ese ID' });
        }

        // 3. OPCIONAL (Pero muy recomendado): 
        // Como ya hemos buscado al cliente en la base de datos, podemos guardarlo en el objeto 'req'.
        // Así, en tu controlador 'remove' o 'edit' no tendrás que volver a hacer un selectById.
        req.cliente = cliente;

        // Si todo está bien, pasamos al siguiente controlador
        next();

    } catch (error) {
        // Si hay un error de conexión a la base de datos, lo mandamos al manejador global de errores
        next(error);
    }
}

module.exports = {
    checkClienteId
}