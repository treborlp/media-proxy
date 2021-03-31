const RoleSchema = require('../models/role');
const UsuarioSchema = require('../models/usuario');
const CategoriaSchema = require('../models/categoria')
const ProductoSchema = require('../models/producto')

const validarRol = async(rol = '') => {
    const existeRol = await RoleSchema.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol: ${rol} no se encuentra registrado`)
    }
}

//Verificamos si el correo existe

const validarCorreo = async(correo) => {

    const correoExiste = await UsuarioSchema.findOne({ correo }); //Consultamos a la base de datos si el correo ya existe
    if (correoExiste) {
        throw new Error(`El correo ya existe`)
    }
}

const validarExisteID = async(id) => {

    const usuarioExiste = await UsuarioSchema.findById(id); //Consultamos a la base de datos si el correo ya existe
    if (!usuarioExiste) {
        throw new Error(`El usuario no existe en la base de datos`)
    }
}

const validarExisteCategoria = async(id) => {

    const categoriaExiste = await CategoriaSchema.findById(id); //Consultamos a la base de datos si el correo ya existe
    if (!categoriaExiste || !categoriaExiste.estado) {
        throw new Error(`La categoria no existe en la base de datos`)
    }
}

const validarExisteProducto = async(id = "") => {

    const productoExiste = await ProductoSchema.findById(id); //Consultamos a la base de datos si el correo ya existe
    if (!productoExiste || !productoExiste.estado) {
        throw new Error(`El producto no existe en la base de datos`)
    }

}

const validarSiAgotado = async(id = "") => {
    const productoExiste = await ProductoSchema.findById(id); //Consultamos a la base de datos si el correo ya existe
    if (!productoExiste.disponible)
        throw new Error(`El producto se encuentra agotado`)
}

const colecionesPermitidas = (coleccion = '', colecciones = []) => {
    if (!colecciones.includes(coleccion)) {
        throw new Error('La coleccion no es permitida')
    }

    return true
}




module.exports = {
    validarRol,
    validarCorreo,
    validarExisteID,
    validarExisteCategoria,
    validarExisteProducto,
    validarSiAgotado,
    colecionesPermitidas
}