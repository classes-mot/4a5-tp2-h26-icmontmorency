import "./GameForm.css";
import { useState } from "react"
import { useParams } from "react-router-dom";
import def from "../../assets/default.jpg"
function GameForm({mode}) {

    const [games, addGames] = useState(JSON.parse(localStorage.getItem("games")) || [])

    const [inputTitre, validerTitre] = useState(false)
    const [catChoisie, validerCatChoisie] = useState(false)
    const [duree, validerDuree] = useState(false)
    const [joueurs, validerJoueurs] = useState(false)
    const [ajoutSucces, setAjoutSucces] = useState(false)
    const [modifSucces, setModifSucces] = useState(false)
    const params = useParams();

    function addTaskSubmitHandler(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd);
        console.log(data);
        const nouveauJeu = {
            id: games.length,
            name: data.inputTitre,
            categorie: data.comboCat,
            duree: data.inputDuree,
            image: def,
            nbJoueurs: data.inputJoueurs
        }


        if (data.inputTitre.length > 12 || data.inputTitre.length === 0) {
            validerTitre(true);
        } else {
            validerTitre(false);
        }

        if (data.comboCat === "") {
            validerCatChoisie(true);
        } else {
            validerCatChoisie(false);
        }
            
        const dureeValue = Number(data.inputDuree);
        if (dureeValue > 200 || dureeValue <= 0 || data.inputDuree === "") {
            validerDuree(true);
        } else {
            validerDuree(false);
        }

        const joueursValue = Number(data.inputJoueurs);
        if (joueursValue > 12 || joueursValue <= 0 || data.inputJoueurs === "") {
            validerJoueurs(true);
        } else {
            validerJoueurs(false);
        }
        
        if (data.inputTitre.length <= 12 && data.inputTitre.length > 0 
            && data.comboCat !== "" 
            && data.inputDuree !== "" && dureeValue <= 200 && dureeValue > 0
           && data.inputJoueurs !== "" && joueursValue <= 12 && joueursValue > 0 
        ) {
            
            const updatedGames = [...games, nouveauJeu];
            addGames(updatedGames);
            localStorage.setItem("games", JSON.stringify(updatedGames));
            setAjoutSucces(true);
        } else {
            setAjoutSucces(false);
        }
    }
    function modifySubmitHandler(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd);
        console.log(data);
        if (data.inputTitre.length > 12 || data.inputTitre.length === 0) {
            validerTitre(true);
        } else {
            validerTitre(false);
        }

        if (data.comboCat === "") {
            validerCatChoisie(true);
        } else {
            validerCatChoisie(false);
        }
            
        const dureeValue = Number(data.inputDuree);
        if (dureeValue > 200 || dureeValue <= 0 || data.inputDuree === "") {
            validerDuree(true);
        } else {
            validerDuree(false);
        }

        const joueursValue = Number(data.inputJoueurs);
        if (joueursValue > 13 || joueursValue <= 0 || data.inputJoueurs === "") {
            validerJoueurs(true);
        } else {
            validerJoueurs(false);
        }
        
        if (data.inputTitre.length <= 12 && data.inputTitre.length > 0
            && data.comboCat !== ""
            && data.inputDuree !== "" && dureeValue <= 200 && dureeValue > 0
            && data.inputJoueurs !== "" && joueursValue <= 12 && joueursValue > 0) {
        

            let img = def
            if (games[params.id].image != def) {
                img = games[params.id].image
            } 
            let updatedGames = games.filter(game => game.id != params.id);
            
            const nouveauJeu = {
                id: params.id,
                name: data.inputTitre,
                categorie: data.comboCat,
                duree: data.inputDuree,
                image: img,
                nbJoueurs: data.inputJoueurs
            }
            updatedGames = [...updatedGames, nouveauJeu];
            addGames(updatedGames);
            localStorage.setItem("games", JSON.stringify(updatedGames));
            setModifSucces(true);
        } else {
            setModifSucces(false);
        }
        
    }
    return (
        <form className="frameGF" onSubmit={mode == "add" ? addTaskSubmitHandler : modifySubmitHandler}>
            <h1>{mode == "add" ? <>Ajouter un jeu</> : <>Modifier un jeu</>}</h1>
            <label htmlFor="inputTitre">Titre</label>
            <input type="text" id="inputTitre" name="inputTitre"  defaultValue={mode == "add" ? null: games[params.id].name}/>

            <label htmlFor="comboCat">Catégorie</label>

            <select id="comboCat" name="comboCat" defaultValue={mode == "add" ? null: games[params.id].categorie}>
                <option value="">Choisir une catégorie...</option>
                <option value="Stratégie">Stratégie</option>
                <option value="Famille">Famille</option>
                <option value="Hasard">Hasard</option>

            </select>


            <div className="formNumbers">
                <label htmlFor="inputJoueurs">Joueurs</label>
                <input type="number" id="inputJoueurs" name="inputJoueurs" defaultValue={mode == "add" ? null: (games[params.id].nbJoueurs)}/>

                <label htmlFor="inputDuree">Durée (min)</label>
                <input type="number" id="inputDuree" name="inputDuree" defaultValue={mode == "add" ? null: (games[params.id].duree)}/>
            </div>
            {inputTitre ? (
                <div className="erreur">* Le titre doit être composé de 1 à 12 caractères.</div>
                ) : null }
            {catChoisie ? (
                <div className="erreur">* Veuillez sélectionner une catégorie.</div>
                ) : null }
            {duree ? (
                <div className="erreur">* La durée doit être entre 1 et 200 minutes.</div>
                ) : null }
            {joueurs ? (
                <div className="erreur">* Le nombre de joueurs doit être en 0 et 12 joueurs.</div>
                ) : null }
            {ajoutSucces ? (
                <div className="succes">Votre jeu a été ajouté avec succès!</div>
                ) : null }
            {modifSucces ? (
                <div className="succes">Votre jeu a été modifié avec succès!</div>
                ) : null }
            <button type="submit">Sauvegarder</button>
        </form>
        );
}

export default GameForm;