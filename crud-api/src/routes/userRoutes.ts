import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/users', userController.create);
router.get('/users', userController.list);
router.get('/users/:id', userController.get);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.remove);

export default router;
