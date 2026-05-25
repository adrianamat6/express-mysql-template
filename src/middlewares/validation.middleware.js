const validateSchema = (schema) => {
    return async (req, res, next) => {
        try { 
            // abortEarly: false hace que Yup devuelva todos los errores de validación
            // stripUnknown: true (opcional pero recomendado) elimina los campos del body que no estén en tu schema
            const data = await schema.validate(req.body, { abortEarly: false});
            
            // Reemplazamos req.body con los datos limpios y validados
            req.body = data; 
            next();
        } catch (error) {

            res.status(400).json({ message: 'Error de validación', errors: error.errors
            });
        }
    }
}

module.exports = {
    validateSchema
}