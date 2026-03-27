import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    categorie: {type: String, required: true},
    duree: {type: String, required: true},
    image: {type: Object, required: true},
    nbJoueurs: {type: Number, required: true}
})

export const Game = mongoose.model("Game", gameSchema)