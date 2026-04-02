import express from 'express';
import { check } from 'express-validator';
import gameController from '../controllers/gameController.js';
import checkAuth from "../authentification/checkAuth.js"

const router = express.Router();

// Middleware pour obtenir toutes les tâches
router.get('/', gameController.getGames);

router.get('/:tid', gameController.getGamesById);

//router.use(checkAuth);

router.post(
  '/add', gameController.createGame
);

router.patch('/update/:tid', gameController.updateGame);

router.delete('/delete/:tid', gameController.deleteGame);

export default router;