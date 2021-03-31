const { Router } = require('express');
const { check } = require('express-validator');

const {
    crearProducto,
    actualizarProducto,
    obtenerProducto,
    obtenerProductoUnico,
    eliminarProducto
} = require('../controllers/producto');
const {
    validarExisteCategoria,
    validarExisteProducto,
    validarSiAgotado
} = require('../helpers/db-validator');

const { validarCampos } = require('../middleware/validar-campo');
const validarJWT = require('../middleware/validar-jwt');
const verificarRol = require('../middleware/verificar-rol');
const routes = Router();

routes.get('/', obtenerProducto)

routes.get('/:id', [
    check("id", "el identificador no tiene la estructura de mongo").isMongoId(),
    check("id", "El producto no existe").custom(validarExisteProducto),
    validarCampos,
    check("id", "El producto no existe").custom(validarSiAgotado),
    validarCampos
], obtenerProductoUnico)

routes.post('/', [
    validarJWT,
    check('categoria', "La categoria no puede estar vacia").not().isEmpty(),
    check('categoria').custom(validarExisteCategoria),
    check('descripcion', 'La descripcion es necesaria').not().isEmpty(),
    check("nombre", "La categoria es necesaria").not().isEmpty(),
    validarCampos
], crearProducto)


//Cualquiera con token valido 
routes.put('/:id', [
        validarJWT,
        check("id", "el identificador no tiene la estructura de mongo").isMongoId(),
        check("id", "El producto no existe").custom(validarExisteProducto),
        check('categoria').custom(validarExisteCategoria),
        validarCampos
    ],
    actualizarProducto)


// //Borrar categoria - solo admin
routes.delete('/:id', [
    validarJWT,
    verificarRol,
    check("id", "el identificador no tiene la estructura de mongo").isMongoId(),
    check("id", "El producto no existe").custom(validarExisteProducto),
    validarCampos
], eliminarProducto)


module.exports = routes