import "./LoginForm.css";
import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext/AuthContext"
function LoginForm({fermer}) {

    const [usernameValide, validerUsername] = useState(false)
    const [passwordValide, validerPassword] = useState(false)
    const auth = useContext(AuthContext)

    function addTaskSubmitHandler(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd);
        auth.login();


        
    }
    return (
        <form className="frameLF" onSubmit={addTaskSubmitHandler}>
            <h1>Login</h1>
            <label htmlFor="inputUsername">Username</label>
            <input type="text" id="inputUsername" name="inputUsername"/>

            <label htmlFor="inputPassword">Mot de passe</label>
            <input type="password" id="inputPassword" name="inputPassword"/>
            <button type="submit">Login</button>
        </form>
        );
}

export default LoginForm;