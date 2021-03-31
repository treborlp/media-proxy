const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/generar-jwt");
const validarLoginGoogle = require("../helpers/google-verify");
const UsuarioSchema = require('../models/usuario');

const login = async(req, res) => {

    const { correo, password } = req.body;

    try {
        //varificar si el correo existe
        const usuario = await UsuarioSchema.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msj: "Error en el correo o password: correo"
            })
        }
        //verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msj: "Error en el correo o password: status"
            })
        }
        //comparar password
        const verificarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!verificarPassword) {
            return res.status(400).json({
                msj: "Error en el correo o password: password"
            })
        }

        //Generar JWToken
        const token = await generarJWT(usuario._id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            msj: "Error durante el proceso de login"
        })
    }

}

const loginGoogle = async(req, res) => {
    const { id_token } = req.body;

    try {
        const { nombre, correo, img } = await validarLoginGoogle(id_token);

        //Verificamos si el usuario existe en la base de datos
        let usuarioExiste = await UsuarioSchema.findOne({ correo });

        if (!usuarioExiste) { //Si el usuario no existe se crea con uno con los datos de google
            const data = {
                    nombre,
                    correo,
                    img,
                    google: true,
                    password: "xD"
                }
                //Guardamos en la base de datos
            usuarioExiste = new UsuarioSchema(data);
            await usuarioExiste.save();
        } else {

            if (usuarioExiste.estado === false) { //Se verifica si el usuario tiene una cuenta desactivada
                return res.status(400).json({
                    msj: "Usuario Bloqueado"
                })
            }
        }

        //Generar JWToken
        const token = await generarJWT(usuarioExiste._id); //Se crea un token con el id 

        res.status(200).json({
            msj: "Usuario Autentificado",
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msj: "Error con la validacion de google"
        })

    }

}



module.exports = { login, loginGoogle }