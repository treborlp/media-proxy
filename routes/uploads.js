const { Router } = require('express');
const { check } = require('express-validator');
const { uploads, actualizarImagenCategoria, obtenerImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { colecionesPermitidas } = require('../helpers');

const { validarCampos, validarExisteArchivoImagen } = require('../middleware/');
const routes = Router();

routes.post('/', validarExisteArchivoImagen, uploads);
routes.put('/:coleccion/:id', [
        validarExisteArchivoImagen,
        check('id', 'no es un id mongo').isMongoId(),
        check('coleccion', 'no permitida').custom(c => colecionesPermitidas(c, ['usuarios', 'productos'])),
        validarCampos
    ], actualizarImagenCloudinary) //Cloudinary
    //], actualizarImagenCategoria)
routes.get('/:coleccion/:id', [
    check('id', 'no es un id mongo').isMongoId(),
    check('coleccion', 'no permitida').custom(c => colecionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], obtenerImagen)


module.exports = routes