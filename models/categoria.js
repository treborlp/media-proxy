const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({

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
    }

});

module.exports = model('Categoria', CategoriaSchema)