const { response } = require("express");
const digest = require('node-digest-auth-client');
const CategoriaSchema = require("../models/categoria")
const fs = require("fs");

var url = 'http://192.168.100.108/cgi-bin/global.login';


const girarCamara = async(req, res = response) => {
    //Respuesta 
    const { grados } = req.params;

    const options = {
        hostname: '192.168.100.108',
        port: 80,
        path: `/cgi-bin/ptz.cgi?action=start&channel=1&code=PositionABS&arg1=${grados}&arg2=0&arg3=0&arg4=1`,
        method: 'GET',
        headers: {
            'Connection': 'Keep-Alive',
            'Content-Type': 'text/plain',
            'Host': '127.0.0.1'
        }
    };

    let GetData = (err, data) => {
        if (err) {
            console.error("Mensaje de error: ", err);
        } else {
            //console.log(data);
        }
    }

    digest.digestRequest(options, null, "admin", "Inaigem1.1", GetData);


    res.status(200).json({
        msj: "Giro camera"
    })
}

girarContinuo = (req, res = response) => {
    //Respuesta 
    const { movimiento } = req.params;

    const options = {
        hostname: '192.168.100.108',
        port: 80,
        path: `/cgi-bin/ptz.cgi?action=${movimiento}&channel=1&code=Left&arg1=0&arg2=2&arg3=1&arg4=0`,
        method: 'GET',
        headers: {
            'Connection': 'Keep-Alive',
            'Content-Type': 'text/plain',
            'Host': '127.0.0.1'
        }
    };

    let GetData = (err, data) => {
        if (err) {
            console.error("Mensaje de error: ", err);
        } else {
            //console.log(data);
        }
    }

    digest.digestRequest(options, null, "admin", "Inaigem1.1", GetData);


    res.status(200).json({
        msj: movimiento
    })
}

const takeSnapshot = (req, res) => {
    //Respuesta 
    const { channel } = req.params;
    let imagen;

    const options = {
        hostname: '192.168.100.108',
        port: 80,
        path: `/cgi-bin/snapshot.cgi?channel=${channel}`,
        method: 'GET',
        headers: {
            'Connection': 'Keep-Alive',
            'Content-Type': 'text/plain',
            'Host': '127.0.0.1'
        }
    };

    let GetData = (err, data) => {
        if (err) {
            console.error("Mensaje de error: ", err);
        } else {
            fs.writeFileSync("./database/imagen.txt", data);
        }
    }

    digest.digestRequest(options, null, "admin", "Inaigem1.1", GetData);


    res.status(200).json({
        msj: 'Imagen tomada'
    })
}

module.exports = {
    girarCamara,
    girarContinuo,
    takeSnapshot
}