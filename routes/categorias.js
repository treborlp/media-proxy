const { Router } = require('express');
const { check } = require('express-validator');

const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaUnica,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categorias');

const { validarExisteCategoria } = require('../helpers/db-validator');

const { validarCampos } = require('../middleware/validar-campo');
const validarJWT = require('../middleware/validar-jwt');
const verificarRol = require('../middleware/verificar-rol');


const routes = Router();

routes.get('/', obtenerCategorias)

routes.get('/:id', [
    check("id", "el identificador no tiene la estructura de mongo").isMongoId(),
    check("id", "La categoria no existe").custom(validarExisteCategoria),
    validarCampos
], obtenerCategoriaUnica)

routes.post('/', [
    validarJWT,
    check("nombre", "La categoria es necesaria").not().isEmpty(),
    validarCampos
], crearCategoria)


//Cualquiera con token valido 
routes.put('/:id', [
        validarJWT,
        check("id", "No se encuentra id").not().isEmpty(),
        check("id", "el identificador no tiene la estructura de mongo").isMongoId(),
        check("id", "La categoria no existe").custom(validarExisteCategoria),
        validarCampos
    ],
    actualizarCategoria)


//Borrar categoria - solo admin
routes.delete('/:id', [
    validarJWT,
    verificarRol,
    check("id", "el identificador no tiene la estructura de mongo").isMongoId(),
    check("id", "La categoria no existe").custom(validarExisteCategoria),
    validarCampos
], eliminarCategoria)


module.exports = routes