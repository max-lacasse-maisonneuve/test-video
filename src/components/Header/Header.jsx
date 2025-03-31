import { useRef, useContext } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContextProvider";

function Header() {
    const { jeton, connexion, deconnexion } = useContext(AuthContext);
    const formRef = useRef();

    async function envoiFormulaire(evenement) {
        try {
            //Bloquer l'envoi
            evenement.preventDefault();

            //Récupérer le body
            const { mdp, courriel } = formRef.current;

            const body = { mdp: mdp.value, courriel: courriel.value };
            const options = {
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            };

            let URL = "http://localhost:3001/utilisateurs/connexion";
            //Valider le champs
            //Envoyer
            const reponse = await fetch(URL, options);
            const donnees = await reponse.json();

            if (reponse.ok) {
                // Si la connexion est bonne, on sauvegarde l'info
                connexion(donnees.jeton);
            } else {
                // Sinon on affiche une erreur
            }
        } catch (erreur) {
            console.log(erreur);
        }
    }

    return (
        <header>
            <h1>Mon site</h1>
            <nav>
                <NavLink to={"/"}>Accueil</NavLink>
                <NavLink to={"/films"}>Liste des films</NavLink>
                <NavLink to={"/films/ajout"}>Ajouter un film</NavLink>
                {!jeton && (
                    <form action="" ref={formRef} onSubmit={envoiFormulaire}>
                        <label htmlFor="courriel">Courriel</label>
                        <input type="email" name="courriel" id="courriel" />
                        <label htmlFor="mdp">Mot de passe</label>
                        <input type="password" name="mdp" id="mdp" />
                        <input type="submit" value="Connexion" />
                    </form>
                )}

                {jeton && (
                    <div className="bouton" onClick={deconnexion}>
                        Déconnexion
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
