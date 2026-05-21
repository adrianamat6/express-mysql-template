# API Clientes

# Recuperar todos los clientes
Method: GET
URL: /api/clientes
Headers: XXXXXX
Body: XXXXX

Respuesta: 
- Array con todos los clientes (JSON)

## Creación de clientes
Method: POST
URL: api/clientes
Headers: XXXXX
Body: nombres, apellidos, emails...

Respuesta: 
- 201 + Datos del nuevo cliente (JSON)

## Borrado de un cliente
Method: DELETE
URL: api/clientes
Headers: XXXXX
Body: XXXX

Respuesta: 
- 201 + Datos del  cliente borrado (JSON)

## Actualización completa del cliente
Method: PUT
URL: api/clientes/idCliente
Headers: XXXXX
Body: Todos los datos del cliente

Respuesta: 
- 201 + Datos del  cliente actualizado (JSON)

