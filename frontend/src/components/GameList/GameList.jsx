
import "./GameList.css";
import GameCard from "../GameCard/GameCard"
import { useEffect, useState } from "react"

function GameList() {
    const [games, setGames] = useState(JSON.parse(localStorage.getItem("games")) || [])
    const [filter, setFilter] = useState("");
    useEffect(()=> {
        if (filter != "") {
            const allGames = JSON.parse(localStorage.getItem("games")) || []
            const updatedGames = allGames.filter(game => game.name.includes(filter));
            setGames(updatedGames)
        } else {
            setGames(JSON.parse(localStorage.getItem("games")) || [])
        }
        
        
    }, [filter])
    return (
        <div className="frameGL">
            <div className="rech">
                <input type="text" onChange={(e) => setFilter(e.target.value)} /><p>🔎</p>
            </div>
            <div id="modalAnchor"></div>
            <ul>
                {console.log(games)}
                {games.map((game) => (
                    <li key={game.id}>
                        <GameCard
                            id={game.id}
                            name={game.name}
                            categorie={game.categorie}
                            duree={game.duree}
                            image={game.image}
                            deleteGames={setGames}
                            games={games}
                            nbJoueurs={game.nbJoueurs}
                        />
                    </li>
                ))}
            </ul>
        </div>
        

    );
}

export default GameList;