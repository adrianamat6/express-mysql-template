db = require('../config/db');

const selectAll = async () => {
    const [result, fields] = await db.query('SELECT * FROM clientes'); 
    //console.log(result);
    //console.log(fields);
    return result;
    // Si la query es un select el resultado es un array con dos elementos, el primero es el resultado de la consulta y el segundo son los campos de la tabla.
    
};


module.exports = {
    selectAll
}