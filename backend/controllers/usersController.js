// users-controller.js
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid'; // Assurez-vous d'avoir la bibliothèque 'uuid'.
import { User } from "../models/user.js"
import HttpError from '../util/httpError.js';
import { json } from 'express';

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
      console.error(err);
      const error = new HttpError(
        'Get failed, please try again later.',
        500
      );
      return next(error);
  }
  res.json({ users: users})
};

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = MOCK_USERS.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ message: 'Utilisateur non trouvé.' });
  } else {
    res.json({ user });
  }
};

const registerUser = async (req, res, next) => {
  console.log('registering');
  const { name, email, password} = req.body;
  
  let existingUser;
  try {
    existingUser = await User.findOne({email: email});
  } catch (err) {
      console.error(err);
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
  if (existingUser) {
      const error = new HttpError(
        'User already exists.',
        500
      );
      return next(error);
  }
  const createUser = new User({
  name, email, password
})
  try {
    await createUser.save();
  } catch (err) {
      console.error(err);
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
  }

  res.status(201).json({
      userId: createUser.id,
      email: createUser.email,
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({email: email});
  } catch (err) {
      console.error(err);
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }

  if (!existingUser || existingUser.password !== password) {
    res
      .status(401)
      .json({ message: 'Identification échouée, vérifiez vos identifiants.' });
  } else {
    let token;
    try {
      console.log('identifié!');
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        'cleSuperSecrete!',
        { expiresIn: '1h' }
      );
      console.log(token);
    } catch (err) {
      console.error(err);
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    res.status(201).json({
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    });
  }

  
};

const updateUserById = (req, res, next) => {
  const userId = req.params.uid;
  const { name, email, password, image, role } = req.body;
  const userIndex = MOCK_USERS.findIndex((u) => u.id === userId);
  const updatedUser = {
    ...MOCK_USERS[userIndex],
    name,
    email,
    password,
    image,
    role,
  };
  MOCK_USERS[userIndex] = updatedUser;
  res.status(200).json({ user: updatedUser });
};

export default {
  getUsers,
  getUserById,
  registerUser,
  login,
  updateUserById,
};
