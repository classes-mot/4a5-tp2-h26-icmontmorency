import express from 'express';
import { check } from 'express-validator';
import gameController from '../controllers/gameController.js';

const router = express.Router();

// Middleware pour obtenir toutes les tâches
router.get('/', gameController.getTasks);

router.get('/:tid', gameController.getTasksById);

//router.use(checkAuth);

router.post(
  '/', gameController.createTask
);

router.patch('/:tid', gameController.updateTask);

router.delete('/:tid', gameController.deleteTask);

export default router;