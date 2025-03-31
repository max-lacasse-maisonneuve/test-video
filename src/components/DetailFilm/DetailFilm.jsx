import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.css";

function DetailFilm() {
    const { id } = useParams();
    const navigate = useNavigate();

    let [film, setFilm] = useState({
        id: "",
        titre: "",
        genres: [""],
        description: "",
        annee: "",
        realisation: "",
        titreVignette: "",
    });

    useEffect(() => {
        async function fetchData() {
            const reponse = await fetch(`https://four1f-620-backend.onrender.com/films/${id}`);
            const donneesFilm = await reponse.json();
            setFilm(donneesFilm);
        }

        fetchData();
    }, [id]);

    async function supprimer() {
        const objRequete = {
            method: "DELETE",
        };
        const reponse = await fetch(`https://four1f-620-backend.onrender.com/films/${id}`, objRequete);

        if (reponse.ok == true) {
            navigate("/films");
        }
    }

    return (
        <div className="detail">
            <h1>{film.titre}</h1>
            <h2>{film.description}</h2>
            <p>{film.annee}</p>
            <p>{film.genres && film.genres.join("-")}</p>
            <img src={`/img/${film.titreVignette}`} alt={film.titre} />
            <div onClick={supprimer}>Supprimer le film</div>
        </div>
    );
}

export default DetailFilm;
