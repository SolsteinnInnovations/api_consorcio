"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localidadBulk = void 0;
const localidades_model_1 = require("../models/localidades.model");
const localidadBulk = async () => {
    try {
        const localidades = [
            { nombre: "Wilde".toUpperCase(), codigoPostal: "1875", idProvincia: "60c72b2f9b1e8c001c8e4d1a" },
            { nombre: "Micro centro".toUpperCase(), codigoPostal: "1005", idProvincia: "68a602439957d85e46ddb594" },
            { nombre: "Cordoba".toUpperCase(), codigoPostal: "5000", idProvincia: "68a602439957d85e46ddb598" },
        ];
        await localidades_model_1.LocalidadesModel.deleteMany({}); // Limpia localidades previas
        await localidades_model_1.LocalidadesModel.insertMany(localidades);
    }
    catch (error) {
        console.error("Error al insertar localidades:", error);
    }
};
exports.localidadBulk = localidadBulk;
//# sourceMappingURL=LocalidadService.js.map