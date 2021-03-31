const validarExisteArchivoImagen = require('../middleware/validar-img')
const validarCampos = require('../middleware/validar-campo')
const validarJWT = require('../middleware/validar-jwt')
const verificarRol = require('../middleware/verificar-rol')

module.exports = {
    ...validarExisteArchivoImagen,
    ...validarCampos,
    ...validarJWT,
    ...verificarRol
}