
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ProvinciasModel, IProvincia } from '../models/provincias.model';
import { PaisesModel } from '../models/paises.model'; // Para validar idPais

export const ProvinciasBulk = async () => {
  try {
    const idPaisArgentina = new mongoose.Types.ObjectId("68a35c130759a3ab490cf493");

    const provincias = [
      { nombre: "Buenos Aires", idPais: idPaisArgentina },
      { nombre: "Capital Federal", idPais: idPaisArgentina },
      { nombre: "Catamarca", idPais: idPaisArgentina },
      { nombre: "Chaco", idPais: idPaisArgentina },
      { nombre: "Chubut", idPais: idPaisArgentina },
      { nombre: "Córdoba", idPais: idPaisArgentina },
      { nombre: "Corrientes", idPais: idPaisArgentina },
      { nombre: "Entre Ríos", idPais: idPaisArgentina },
      { nombre: "Formosa", idPais: idPaisArgentina },
      { nombre: "Jujuy", idPais: idPaisArgentina },
      { nombre: "La Pampa", idPais: idPaisArgentina },
      { nombre: "La Rioja", idPais: idPaisArgentina },
      { nombre: "Mendoza", idPais: idPaisArgentina },
      { nombre: "Misiones", idPais: idPaisArgentina },
      { nombre: "Neuquén", idPais: idPaisArgentina },
      { nombre: "Río Negro", idPais: idPaisArgentina },
      { nombre: "Salta", idPais: idPaisArgentina },
      { nombre: "San Juan", idPais: idPaisArgentina },
      { nombre: "San Luis", idPais: idPaisArgentina },
      { nombre: "Santa Cruz", idPais: idPaisArgentina },
      { nombre: "Santa Fe", idPais: idPaisArgentina },
      { nombre: "Santiago del Estero", idPais: idPaisArgentina },
      { nombre: "Tierra del Fuego, Antártida e Islas del Atlántico Sur", idPais: idPaisArgentina },
      { nombre: "Tucumán", idPais: idPaisArgentina }
    ];

    await ProvinciasModel.deleteMany({ idPais: idPaisArgentina }); // Limpia provincias previas de Argentina
    await ProvinciasModel.insertMany(provincias);

    console.log("Provincias de Argentina insertadas correctamente.");
    
  } catch (error) {
    console.error("Error al insertar provincias:", error);
   
  }
};

