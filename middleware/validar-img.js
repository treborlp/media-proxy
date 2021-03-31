const validarExisteArchivoImagen = (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msj: 'No se encuentra ningun file llamado archivo en la peticion' });
    }

    next();
}

module.exports = { validarExisteArchivoImagen };