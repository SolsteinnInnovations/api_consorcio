import { Router } from 'express';
import {
    crearAnuncio,
    getAnuncios,
    getAnuncioById,
    actualizarAnuncio,
    eliminarAnuncio
} from '../controllers/anuncios.controller';

const router = Router();

router.post('/', crearAnuncio);
router.get('/', getAnuncios);
router.get('/:id', getAnuncioById);
router.put('/:id', actualizarAnuncio);
router.delete('/:id', eliminarAnuncio);

export default router;