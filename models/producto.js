const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: [true, "El rol es requerido"]
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, "El estado es requerido"]
    },
    usuario: { //Referenciamos al usuario que creo la categoria
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El Usuario es requerido"]
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: { //Referenciamos al usuario que creo la categoria
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: [true, "El Categoria es requerido"]
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String }


});

module.exports = model('Producto', ProductoSchema)