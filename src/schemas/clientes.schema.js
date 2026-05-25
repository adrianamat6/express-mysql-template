const yup = require('yup');

const LETRAS_DNI = 'TRWAGMYFPDXBNJZSQVHLCKE';

// como el clientes es un objeto, pero se podria validar un array
const clienteSchema = yup.object().shape({
    nombre: yup
        .string()
        .required('El nombre es obligatorio'),
    apellidos: yup
        .string()
        .required('Los apellidos son obligatorios'),
    direccion: yup
        .string()
        .min(5, 'La dirección debe tener al menos 5 caracteres')
        .required('La dirección es obligatoria'),
    email: yup
        .string()
        .trim() // opcional, para eliminar espacios al principio y al final del email y que llegue lo más limpio posible a la base de datos
        .uppercase() // opcional,  pero si quieres que el email se guarde siempre en mayúsculas  (para que llegue lo más limpio posible a la base de datos)
        .email('El email tiene un formato no válido')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'El email tiene un formato no válido'), // regex para validar el formato del email
    edad: yup
        .number()
        .min(18, 'La edad mínima es 18 años')
        .max(120, 'La edad máxima es 120 años')
        .integer('La edad debe ser un número entero'), 
    genero: yup
        .string()
        .oneOf(['M', 'F', 'O'], 'El género debe ser M o F u O'), 

    dni: yup
        .string()
        .trim() // opcional, para eliminar espacios al principio y al final del DNI y que llegue lo más limpio posible a la base de datos
        .uppercase() // opcional,  pero si quieres que el DNI se guarde siempre en mayúsculas  (para que llegue lo más limpio posible a la base de datos)
        .matches(/^\d{8}[A-HJ-NP-TV-Z]$/, 'El DNI debe tener 8 dígitos seguidos de una letra mayúscula')
        .required('El DNI es obligatorio')
        .test('letra-dni', 'La letra del DNI no es correcta', 
            (value) => {
                const numero = value.substring(0,8); //substring para obtener los 8 dígitos del DNI
                const letra = value.at(8); //at para obtener la letra del DNI
                return LETRAS_DNI.charAt(numero % 23) === letra; //comprobamos que la letra del DNI es correcta, el número del DNI módulo 23 nos da un índice para obtener la letra correcta del DNI
            }
        )

        
});

module.exports = {
    clienteSchema
}
