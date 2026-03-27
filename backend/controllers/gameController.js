import HttpError from '../util/http-error.js'; // Assurez-vous que le chemin d'accès est correct
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid'; // Assurez-vous d'avoir la bibliothèque 'uuid'.
import { Game } from "../models/game.js"

const getGames = async (req, res, next) => {
  let games;
  try {
    games = await Game.find();
    
  } catch {
    console.log("erreur")
  }

  res.json({games: games})
};

const getGamesById = async (req, res, next) => {
  const taskId = req.params.tid; // { tid: 't1' }


  let game;
  try {
    
    game = await Task.findById(taskId);
  } catch(err) {
    console.log("Ajout pas yippy :(", err)
    return next(new HttpError(":(((((((", 500));
  }
  //si la tâche n'est pas trouvée... erreur 404
  if (!game) {
    /*const error = new Error('Tâche non trouvée');
      error.code = 404; // Spécifie le code de statut HTTP pour l'erreur
      return next(error); // Déclenche une erreur personnalisée
      --boni:*/
    return next(new HttpError('Tâche non trouvée', 404));
  }

  res.json({ game: game.toObject({getters: true})});
};


//POST
const createGame = async (req, res, next) => {
  console.log('createGame---------------');
  console.log(req);
  const { name, categorie, duree, image, nbJoueurs } = req.body;
  const createdGame = new Task({
    name,
    categorie,
    duree,
    image,
    nbJoueurs,
  });

  try {
    await createdGame.save();
  } catch(err) {
    console.log("Ajout pas yippy :(", err)
    return next(new HttpError(":(((((((", 500));
  }
  //201 standard pour créé avec succès
  res.status(201).json({ task: createdTask });
};
//PUT
const updateGame = async (req, res, next) => {
  const { name, categorie, duree, image, nbJoueurs } = req.body;
  const gameId = req.params.tid;
  
  let updatedGame;
  try {
    updatedGame = await Game.findById(gameId);
    updatedGame.name = name;
    updatedGame.categorie = categorie;
    updatedGame.duree = duree;
    updatedGame.image = image;
    updatedGame.nbJoueurs = nbJoueurs;
    await updateGame.save();
  } catch {
    console.log("flemme de fair une full ahh erreur")
  }

  res.status(200).json({ game: updatedGame });
};

//DELETE
const deleteGame = async (req, res, next) => {
  const gameId = req.params.tid;
  
  try {
    const game = Game.findByIdAndDelete(gameId);

    if (!game) {
      return res.status(404).json({message: ":(((((( delete"})
    }
  } catch {
    console.log("flemme de fair une full ahh erreur")
  }

};

export default {
  getTasks: getGames,
  getTasksById: getGamesById,
  createTask: createGame,
  updateTask: updateGame,
  deleteTask: deleteGame,
};
