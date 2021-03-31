const { response } = require("express");
const ProductoSchema = require("../models/producto")


const obtenerProducto = async(req, res = response) => {
    //obtetemos el limite e inicio de la paginacion
    const { limite = 5, desde = 0 } = req.query;
    //Solo obtenemos categorias con el estado true
    const query = { estado: true };

    //Realizamos la peticion a la base de datos
    const [productos, total] = await Promise.all([
        ProductoSchema.find(query).skip(Number(desde)).limit(Number(limite)).populate("usuario", "nombre").populate("categoria", "nombre"),
        ProductoSchema.countDocuments(query) //Obtiene el número total de registros
    ]);

    //Respuesta 
    res.status(200).json({
        productos,
        total
    })
}


const obtenerProductoUnico = async(req, res = response) => {
    const { id } = req.params;
    const productoBD = await ProductoSchema.findById(id).populate("usuario", "nombre").populate("categoria", "nombre");
    res.status(200).json(productoBD)
}


const crearProducto = async(req, res = response) => {
        //Obtenemos la categoria del body

        const { nombre, precio, categoria, descripcion, disponible } = req.body;

        //Buscamos productos repetidos
        const productoBD = await ProductoSchema.findOne({ nombre });

        if (productoBD) {
            return res.status(401).json({
                msj: `El producto: ${productoBD.nombre} ya existe`
            });
        }

        const data = {
            nombre: nombre.toUpperCase(),
            precio,
            categoria,
            descripcion,
            disponible,
            usuario: req.usuarioAutentificado._id
        }

        const producto = new ProductoSchema(data);

        await producto.save(); // Guardamos el producto

        res.status(200).json({
            msj: "Producto creado"
        })

    }
    //Actualizar categoria
const actualizarProducto = async(req, res = response) => {
    //Obtengo la data y quito el estado
    let { estado, ...data } = req.body;

    //Uppercase
    data.nombre.toUpperCase();
    //Obtenemos el id del producto
    const { id } = req.params;

    if (!id) {
        res.status(401).json({
            msj: "Id del producto no existe"
        });
    }


    try {
        const actualizado = await ProductoSchema.findByIdAndUpdate(id, data, { new: true }); //{new:true} devuelve el registro actualizado
        res.status(200).json({
            msj: "Producto actualizada"
        });
    } catch (error) {
        return res.status(501).json({
            msj: "Se encontro un error durante la insercion"
        })
    }


}

//Borrar Categoria - estado:false
const eliminarProducto = async(req, res) => {
    //Obtenemos el id de la request
    const { id } = req.params;
    try {
        await ProductoSchema.findOneAndUpdate(id, { estado: false })
        res.status(200).json({
            msj: "Producto eliminado"
        });
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            msj: "No se pudo eliminar"
        })
    }

}


module.exports = {
    obtenerProducto,
    obtenerProductoUnico,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}