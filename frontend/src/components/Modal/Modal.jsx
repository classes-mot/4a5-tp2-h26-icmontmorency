import "./Modal.css";
import { createPortal } from "react-dom";
function Modal({deleteGames, filterdGames, fermer, id}) {
    function deleteHandler() {
            const games = JSON.parse(localStorage.getItem("games"));
            const updatedGames = games.filter(game => game.id !== id);
            const filteredUpdatedGames = filterdGames.filter(game => game.id !== id);
            deleteGames(filteredUpdatedGames);
            localStorage.setItem("games", JSON.stringify(updatedGames));
            fermer(true);
        }
    const games = JSON.parse(localStorage.getItem("games"));
    return createPortal(
        <div className="frameM">
            <div>Voulez-vous vraiment supprimer le jeu: {games[id].name}?</div>
            <div className="buttonsContainer">
                <div id="oui" className="button"onClick={deleteHandler}>Oui</div>
                <div id="non" className="button" onClick={() => {fermer(true)}}>Non</div>
            </div>
            
        </div>
        
    , document.getElementById("modalAnchor"));
}

export default Modal;