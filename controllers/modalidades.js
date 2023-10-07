const { v4: uuidv4 } = require('uuid');

let modalidades = [
    {
        "modalidad": "Combate",
        "id": "33b87286-7292-4053-92ac-6ee3e81f0f41"
    },
    {
        "modalidad": "Seguimiento",
        "id": "cdb5418c-f326-4802-b9d5-5b5631a671cd"
    },
    {
        "modalidad": "Soluciones Industriales",
        "id": "75ebccc9-585f-416e-be64-0ec9e43de74d"
    }
];


class ModalidadesController {
    insertar(modalidad) {
        modalidad.id = uuidv4();
        modalidades.push(modalidad);
    }

    mostrar() {
        return modalidades;
    }

    existeModalidad(id) {
        let existe = false;

        for (const modalidad of modalidades) {
            if (modalidad.id === id) {
                existe = true;
            }
        }

        return existe;
    }
}


module.exports = new ModalidadesController();
