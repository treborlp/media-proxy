const { response } = require("express")
const { ObjectId } = require("mongoose").Types;
const UsuarioSchema = require('../models/usuario');
const CategoriasSchema = require('../models/categoria');
const ProductosSchema = require('../models/producto');

const colecionesPermitidas = [
    'categorias',
    'productos',
    'usuarios',
    'roles'
];

const buscarUsuarios = async(termino, res = response) => {
    const esMongoID = ObjectId.isValid(termino); //Identifica si es un id de mongo


    if (esMongoID) {
        const usuario = await UsuarioSchema.findById(termino);
        res.json({
            respuesta: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const usuario = await UsuarioSchema.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        respuesta: usuario
    })


}

const buscarCategorias = async(termino, res = response) => {
    const esMongoID = ObjectId.isValid(termino); //Identifica si es un id de mongo


    if (esMongoID) {
        const categorias = await CategoriasSchema.findById(termino);
        res.json({
            respuesta: (categorias) ? [categorias] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const categoria = await CategoriasSchema.find({ nombre: regex, estado: true });
    res.json({
        respuesta: categoria
    })
}

const buscarProductos = async(termino, res = response) => {
    const esMongoID = ObjectId.isValid(termino); //Identifica si es un id de mongo


    if (esMongoID) {
        const productos = await ProductosSchema.findById(termino);
        res.json({
            respuesta: (productos) ? [productos] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const productos = await ProductosSchema.find({ nombre: regex, estado: true });
    res.json({
        respuesta: productos
    })


}

const buscarController = async(req, res) => {

    const { coleccion, termino } = req.params;

    if (!colecionesPermitidas.includes(coleccion)) {
        return res.status(401).json({
            msj: "La categoria no existe"
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;

        default:
            res.status(500).json({
                msj: "Error en el servidor"
            })
            break;
    }

}

module.exports = buscarController