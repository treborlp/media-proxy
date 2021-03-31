const verificarRol = (req, res, next) => {

    if (!req.usuarioAutentificado) {
        return res.status(500).json({
            msg: "Error : Primero se debe hacer la validacion del token"
        })
    }

    if (req.usuarioAutentificado.rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            msj: `El usuario: ${req.usuarioAutentificado.nombre} no tiene permisos de eliminacion`
        })
    }

    next()
}

module.exports = verificarRol