import { Router } from 'express';
import {
    crearItemMenu,
    getItemsMenu,
    getItemMenuById,
    actualizarItemMenu,
    eliminarItemMenu
} from '../controllers/itemsMenu.controller';

const router = Router();

router.post('/', crearItemMenu);
router.get('/', getItemsMenu);
router.get('/:id', getItemMenuById);
router.put('/:id', actualizarItemMenu);
router.delete('/:id', eliminarItemMenu);

export default router;