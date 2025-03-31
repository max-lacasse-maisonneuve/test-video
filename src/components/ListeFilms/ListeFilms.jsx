import { useState, useEffect } from "react";
import "./ListeFilms.css";
import VignetteFilm from "../VignetteFilm/VignetteFilm";
import { Helmet } from "react-helmet-async";
function ListeFilms() {
    let limite = 6;

    let [films, setFilms] = useState([]);
    let [decalage, setdecalage] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const reponse = await fetch(
                `https://four1f-620-backend.onrender.com/films?depart=${decalage}&limite=${limite}`
            );
            if (reponse.ok) {
                const donneesFilms = await reponse.json();

                if (donneesFilms) {
                    setFilms(donneesFilms);
                }
            } else {
                setdecalage(decalage - limite);
            }
        }

        fetchData();
    }, [decalage]);

    function onClicPagination(evenement) {
        const bouton = evenement.currentTarget;
        const direction = Number(bouton.dataset.direction);

        let depart = Math.max(direction * limite + decalage, 0);
        console.log(depart);

        setdecalage(depart);
    }
    return (
        <div className="container">
            <Helmet>
                <meta name="description" content="Découvrez notre superbe collection de films d'époque" />
                <title>La liste des films</title>
            </Helmet>
            <h1>Liste des films</h1>
            <div className="grille">
                {films.map((film) => {
                    return <VignetteFilm key={film.id} film={film} />;
                })}
                <nav>
                    <div className="bouton" data-direction="-1" onClick={onClicPagination}>
                        Précédent
                    </div>
                    <div className="bouton" data-direction="1" onClick={onClicPagination}>
                        Suivant
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default ListeFilms;
