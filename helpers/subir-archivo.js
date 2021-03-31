const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesPermitidas = ['jpg', 'png', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const archivoSeparado = archivo.name.split('.');
        const extensionArchivo = archivoSeparado[archivoSeparado.length - 1]; //La extencion sel archivo se optiene mediante la ultima ubicacion del arreglo generado por split

        if (!extensionesPermitidas.includes(extensionArchivo)) {
            return reject(`La extension ${extensionArchivo} no es valida`);
        }

        const nombreTemp = uuidv4() + '.' + extensionArchivo; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

        uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            return resolve(nombreTemp);
        });
    })
}

module.exports = {
    subirArchivo
}