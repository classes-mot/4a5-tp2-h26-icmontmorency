import "./GameCard.css";
import GameIcon from "../GameIcon/GameIcon";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useContext, useState } from "react";
import Modal from "../Modal/Modal"
import { NavLink } from "react-router-dom";
function GameCard({id, name, categorie, duree, image, deleteGames, games, nbJoueurs}) {
    const auth = useContext(AuthContext);
    const [modalOuvert, fermer] = useState(true);

    return (
        <div className="frameGC">
            <img src={image} alt={name}/>
            <h1>{name}</h1>
            <div className="cat">
                <p>{categorie}</p>
                <GameIcon type={categorie} />
            </div>
                <p>{nbJoueurs + " joueurs  |  " + duree + "min"}</p>
            
            {auth.isLoggedIn ? 
            <div className="buttonsContainer">
                <NavLink to={`/edit/${id}`} className="button">Modifier</NavLink>  
                
                <div className="button" onClick= {() => fermer(false)
                }>Supprimer</div>  
                {modalOuvert ? null : <Modal 
                deleteGames={deleteGames}
                fermer={fermer}  
                id={id}
                filterdGames={games}
                />}
            </div>
        : null}
        </div>
    );
}


// ajouter au moin un code pour tester ???
export default GameCard;

