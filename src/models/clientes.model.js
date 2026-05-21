db = require('../config/db');

const selectAll = async () => {
    const [result, fields] = await db.query('SELECT * FROM clientes'); 
    //console.log(result);
    //console.log(fields);
    return result;
    // Si la query es un select el resultado es un array con dos elementos, el primero es el resultado de la consulta y el segundo son los campos de la tabla.
    
};

const selectById = async (clienteId) => {
    const [result] = await db.query('SELECT * FROM clientes WHERE id = ?', [clienteId]);

    if (result.length === 0) {
        return null; // No se ha encontrado el cliente
    }
    console.log('Para ver results, que es lo primero y que es lo segundo:', result);
    return result[0];
}; 



// Destructuring del objeto que recibimos como parámetro para obtener las propiedades necesarias para la inserción en la base de datos. No tiene porque recibir todas las propiedades, pero el nombre si que coincide.
// Añadimos la 'a' en fecha_nacimiento
const insert = async ({nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni}) => {
    
    const [result] = await db.query(
        'INSERT INTO clientes (nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni]
    );
 
    return result;
};

//  Ponemos al mismo nivel clienteId que el resto de propiedades
//  Ponemos dos objetos
const updateById = async (clienteId, {nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni}) => {
    const [result] = await db.query(
        'UPDATE clientes SET nombre = ?, apellidos = ?, direccion = ?, email = ?, edad = ?, genero = ?, cuota = ?, fecha_nacimiento = ?, dni = ? WHERE id = ?',
        [nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni, clienteId]
    );
    return result;
};



const deleteById = async (clienteId) => {
    const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [clienteId]);
    return result; // <-- Quitamos el [0] para devolver el objeto completo
}




module.exports = {
    selectAll, 
    selectById,
    insert,
    updateById,
    deleteById
}

