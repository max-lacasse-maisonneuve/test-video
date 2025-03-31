import { useNavigate } from "react-router-dom";

function VignetteFilm(props) {
    const { film } = props;
    const navigate = useNavigate();

    function onClicVignette(event) {
        navigate(`/films/${film.id}`);
    }

    return (
        <div className="grille-element" onClick={onClicVignette}>
            <p className="titre">{film.titre}</p>
            <img src={`img/${film.titreVignette}`} alt={film.titre} />
        </div>
    );
}

export default VignetteFilm;
