const ModalidadesController = require('./modalidades');
const { v4: uuidv4 } = require('uuid');

let categorias = [
    {
        "id": "85d3b5c4-0385-4551-8ad5-9864def765d8",
        "categoria": "Zumo",
        "idModalidad": "33b87286-7292-4053-92ac-6ee3e81f0f41"
    },
    {
        "id": "007244cb-9e85-484d-862d-606f43bfc26c",
        "categoria": "Incapacidad",
        "idModalidad": "33b87286-7292-4053-92ac-6ee3e81f0f41"
    },
    {
        "id": "1086505e-72f1-4686-bf2f-d1a2d4a2555a",
        "categoria": "Formula 1",
        "idModalidad": "cdb5418c-f326-4802-b9d5-5b5631a671cd"
    },
    {
        "id": "de6b0173-d57b-4853-bbd0-0351c7f2321a",
        "categoria": "Lentos",
        "idModalidad": "cdb5418c-f326-4802-b9d5-5b5631a671cd"
    }
];

class CategoriasController {
    insertar(categoria, idModalidad) {
        if (ModalidadesController.existeModalidad(idModalidad)) {
            let id = uuidv4();
            categorias.push({ id, categoria, idModalidad });
        }
    }

    existeCategoria(id) {
        let existe = false;

        for (const categoria of categorias) {
            if (categoria.id === id) {
                existe = true;
            }
        }

        return existe;
    }

    editar(idCategoria, categoria, idModalidad) {
        if (ModalidadesController.existeModalidad(idModalidad)) {
            for (const cat of categorias) {
                if (cat.id === idCategoria) {
                    cat.categoria = categoria;
                    cat.idModalidad = idModalidad;
                }
            }
        }
    }

    eliminar(idCategoria) {
        for (let i = 0; i < categorias.length; i++) {
            const categoria = categorias[i];
            
            if (categoria.id === idCategoria) {
                categorias.splice(i, 1);
            }
        }
    }

    mostrar() {
        return categorias;
    }
}

module.exports = new CategoriasController();
