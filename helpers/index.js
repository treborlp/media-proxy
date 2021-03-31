const subirArchivo = require('./subir-archivo')
const jwtGenerar = require('./generar-jwt')
const verificarGoogle = require('./google-verify')
const validarDatabase = require('./db-validator')


module.exports = {
    ...subirArchivo, //Los tres puntos (...) exportan las funciones y variables de los helpers
    ...jwtGenerar,
    ...verificarGoogle,
    ...validarDatabase
}