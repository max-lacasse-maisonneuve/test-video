import { Helmet } from "react-helmet-async";

function Accueil() {
    return (
        <div>
            <Helmet>
                <meta name="description" content="Une belle page" />
                <title>Ma page d'accueil</title>
            </Helmet>
            Accueil
        </div>
    );
}

export default Accueil;
