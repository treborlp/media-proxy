const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        //Inicializamos express
        this.app = express();
        this.port = process.env.PORT

        this.path = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
            camera: '/api/camera'
        }

        //  this.conectarDB();
        //Middleware
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //Middlewar cors
        this.app.use(cors());
        //Middlewar de JSON
        this.app.use(express.json());
        //Middlewar carpeta public
        this.app.use(express.static('public'));
        //File uploads
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true //crea la subcarpeta por defecto
        }));
    }


    routes() {
        //Importamos las rutas
        this.app.use(this.path.auth, require("../routes/login"));
        this.app.use(this.path.buscar, require("../routes/buscar"));
        this.app.use(this.path.usuarios, require("../routes/usuarios"));
        this.app.use(this.path.categorias, require("../routes/categorias"));
        this.app.use(this.path.productos, require("../routes/productos"));
        this.app.use(this.path.uploads, require("../routes/uploads"));
        this.app.use(this.path.camera, require("../routes/camera"));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor Corriendo", this.port);
        })
    }

}
module.exports = Server;