import { Request, Response } from 'express';
import { LocalidadesModel, ILocalidad } from '../models/localidades.model';
import { ProvinciasModel } from '../models/provincias.model'; // Para validar idProvincia


export const localidadBulk = async () => {
    try{

        const localidades = [
            { nombre: "Wilde".toUpperCase(), codigoPostal: "1875", idProvincia: "60c72b2f9b1e8c001c8e4d1a" },
            { nombre: "Micro centro".toUpperCase(), codigoPostal: "1005", idProvincia: "68a602439957d85e46ddb594" },
            { nombre: "Cordoba".toUpperCase(), codigoPostal: "5000", idProvincia: "68a602439957d85e46ddb598" },
        ];

        await LocalidadesModel.deleteMany({}); // Limpia localidades previas
        await LocalidadesModel.insertMany(localidades);
    }catch(error){
        console.error("Error al insertar localidades:", error);
    }
}