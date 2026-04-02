import express from 'express';

import usersController from '../controllers/usersController.js';
const router = express.Router();


router.get('/', usersController.getUsers);

router.get('/profile/:uid', usersController.getUserById);

router.post('/register', usersController.registerUser);

router.post('/login', usersController.login);

router.patch('/profile/:uid', usersController.updateUserById);

export default router;
