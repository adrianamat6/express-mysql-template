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

const getById = async (req, res) => {

    // Esto ya lo he hecho en el middleware: 
    // const cliente = await ClienteModel.selectById(clienteId);
    res.json(req.cliente);
}


const create = async (req, res) => {
    // req.body -> nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni
    const result = await ClienteModel.insert(req.body);
    const nuevoCliente = await ClienteModel.selectById(result.insertId); // insertId es la propiedad que devuelve el id del nuevo cliente insertado en la base de datos.
    
    if (!nuevoCliente) {
        return res.status(404).json({ error: 'No existe el cliente con ese ID' });
    }
    res.status(201).json(nuevoCliente);
};



 
const edit = async (req, res) => {
    // Destructuración anidada.El equivalente seria:
    // const body = req.body;
    // const clienteId = req.params.clienteId;
    const { body, params: { clienteId } } = req;

    // FUSIONAMOS: Tomamos el cliente que ya leyó el middleware (req.cliente) 
    // y lo mezclamos con los datos del body para no perder información
    const datosActualizados = { ...req.cliente, ...body };

    // Cambiamos 'body' por 'datosActualizados'
    const result = await ClienteModel.updateById(clienteId, datosActualizados);
    const clienteActualizado = await ClienteModel.selectById(clienteId);

    res.json(clienteActualizado);
};


const remove = async (req, res) => {
    try {
        // PASO 1: Extraemos el ID del cliente de los parámetros de la URL (:clienteId)
        const { clienteId } = req.params; 

        // PASO 2: Recuperamos los datos del cliente que el middleware 'checkClienteId'
        // ya buscó en la base de datos y guardó en el objeto 'req'.
        // De esta forma evitamos hacer una segunda consulta SELECT redundante a la base de datos.
        const cliente = req.cliente; 

        // NOTA DE LÓGICA:
        // Aquí ya no hace falta poner "if (!cliente)", porque si el ID no hubiera existido,
        // el middleware 'checkClienteId' habría respondido un error 404 antes de llegar aquí,
        // cortando el flujo de la petición.

        // PASO 3: Ejecutamos la consulta DELETE en la base de datos para borrar el registro.
        await ClienteModel.deleteById(clienteId);

        // PASO 4: Respondemos al cliente con un mensaje de éxito, y le enviamos de vuelta
        // los datos del cliente que acabamos de borrar (que teníamos guardados en memoria).
        res.json({
            message: 'Cliente eliminado correctamente',
            clienteDeleted: cliente
        });

    } catch (error) {
        // PASO 5: Si hay algún error imprevisto (ej. caída de conexión con la base de datos),
        // lo registramos en la consola del servidor y respondemos con un estado 500 (Error del Servidor).
        console.error('Error al borrar cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}




module.exports = {
    getAll, 
    getById,
    create,
    edit,
    remove
}

