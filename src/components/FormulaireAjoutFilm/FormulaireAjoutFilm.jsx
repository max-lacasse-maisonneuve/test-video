import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty, isLength } from "validator";
import { AuthContext } from "../AuthContext/AuthContextProvider";
function FormulaireAjoutFilm() {
    const { jeton } = useContext(AuthContext);
    const navigate = useNavigate();
    const formRef = useRef();
    const [genres, setGenres] = useState([]);
    const [formulaireValide, setValiditeFormulaire] = useState([false]);
    const [donneesFilm, setDonneesFilm] = useState({
        titre: "",
        description: "",
        realisation: "",
        annee: "",
        titreVignette: "",
        genres: [],
    });

    const [erreurs, setErreurs] = useState({});

    useEffect(() => {
        validerChamps();
    }, []);

    useEffect(() => {
        validerChamps();
    }, [donneesFilm]);

    useEffect(() => {
        const nouvellesDonnees = { ...donneesFilm, genres };
        setDonneesFilm(nouvellesDonnees);
    }, [genres]);

    function onChangeChamp(evenement) {
        const champ = evenement.currentTarget;
        const name = champ.name;
        const value = champ.value;

        const nouvellesDonnees = { ...donneesFilm, [name]: value };
        setDonneesFilm(nouvellesDonnees);
    }

    function validerChamps() {
        const nouvellesErreurs = {};
        const { titre, description, annee } = donneesFilm;

        if (!isLength(titre, { max: 50 })) {
            nouvellesErreurs.titre = "Le titre est trop long";
        } else if (isEmpty(titre)) {
            nouvellesErreurs.titre = "Vous devez fournir un titre";
        }

        setErreurs(nouvellesErreurs);
        setValiditeFormulaire(formRef.current && formRef.current.checkValidity() && Object.keys(nouvellesErreurs) == 0);
    }

    function onChangeGenre(evenement) {
        const champ = evenement.currentTarget;
        const valeur = champ.value;
        const estCoche = champ.checked;

        let nouvellesDonnees = [...genres];

        if (estCoche && !nouvellesDonnees.includes(valeur)) {
            nouvellesDonnees.push(valeur);
        } else if (!estCoche && nouvellesDonnees.includes(valeur)) {
            nouvellesDonnees = nouvellesDonnees.filter((genre) => {
                return genre != valeur;
            });
        }

        setGenres(nouvellesDonnees);
    }

    async function onSubmitFormulaire(evenement) {
        evenement.preventDefault();

        if (formulaireValide) {
            const objEnvoi = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${jeton}`,
                },
                body: JSON.stringify(donneesFilm),
            };
            const reponse = await fetch(`http://localhost:3001/films`, objEnvoi);
            const donneesReponses = await reponse.json();

            if (reponse.ok) {
                navigate("/films");
            } else {
                setErreurs({ ...erreurs, formulaire: donneesReponses.msg });
            }
        }
    }

    return (
        <div>
            <form action="" onSubmit={onSubmitFormulaire} ref={formRef}>
                {erreurs.formulaire && <p>{erreurs.formulaire}</p>}
                <div className="input-group">
                    <label htmlFor="titre">Titre</label>
                    <input
                        type="text"
                        name="titre"
                        id="titre"
                        onChange={onChangeChamp}
                        value={donneesFilm.titre}
                        minLength="4"
                    />
                    {erreurs.titre && <span>{erreurs.titre}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        onChange={onChangeChamp}
                        value={donneesFilm.description}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="realisation">Réalisateur.trice</label>
                    <input
                        type="text"
                        name="realisation"
                        id="realisation"
                        onChange={onChangeChamp}
                        value={donneesFilm.realisation}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="annee">Année</label>
                    <input type="text" name="annee" id="annee" onChange={onChangeChamp} value={donneesFilm.annee} />
                </div>

                <div className="input-group">
                    <label htmlFor="titreVignette">Nom de l'image</label>
                    <input
                        type="text"
                        name="titreVignette"
                        id="titreVignette"
                        onChange={onChangeChamp}
                        value={donneesFilm.titreVignette}
                    />
                </div>

                <input type="file" name="" id="" multiple />

                <div className="input-checkbox-group">
                    <label htmlFor="genre-action">Action</label>
                    <input type="checkbox" id="genre-action" value="Action" onChange={onChangeGenre} />
                    <label htmlFor="genre-drame">Drame</label>
                    <input type="checkbox" id="genre-drame" value="Drame" onChange={onChangeGenre} />
                    <label htmlFor="genre-thriller">Thriller</label>
                    <input type="checkbox" id="genre-thriller" value="Thriller" onChange={onChangeGenre} />
                    <label htmlFor="genre-aventure">Aventure</label>
                    <input type="checkbox" id="genre-aventure" value="Aventure" onChange={onChangeGenre} />
                </div>

                <div className="input-group">
                    <input type="submit" value="Ajouter un film" disabled={formulaireValide == false} />
                </div>
            </form>
        </div>
    );
}

export default FormulaireAjoutFilm;
