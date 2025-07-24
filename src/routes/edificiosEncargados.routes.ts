import { Router } from 'express';
import {
    crearEdificioEncargado,
    getEdificiosEncargados,
    getEdificioEncargadoById,
    eliminarEdificioEncargado
} from '../controllers/edificiosEncargados.controller';

const router = Router();

router.post('/', crearEdificioEncargado);
router.get('/', getEdificiosEncargados);
router.get('/:id', getEdificioEncargadoById);
router.delete('/:id', eliminarEdificioEncargado); // Nota: No hay PUT para esta tabla transpuesta, solo crear/eliminar relaciones

export default router;