import "./GameIcon.css";
import dee from "../../assets/dee.png"
import cerveau from "../../assets/cerveau.png"
import famille from "../../assets/famille.png"
function GameIcon({type}) {
    let image = cerveau;
    if (type == "Hasard") {
        image = dee;
    } else if (type == "Famille") {
        image = famille;
    }
    return (
        <img className="icon" src={image}/>
    );
}

export default GameIcon;