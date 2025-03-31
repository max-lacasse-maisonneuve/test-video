import { Helmet } from "react-helmet-async";

function Accueil() {
    return (
        <div>
            <Helmet>
                <meta name="description" content="Une belle page" />
                <title>Ma page d'accueil</title>
            </Helmet>
            Accueil
            {import.meta.env.VITE_MODE == "Dev" && import.meta.env.VITE_URL_DEV}
            {import.meta.env.VITE_MODE == "Prod" && import.meta.env.VITE_URL_PROD}
        </div>
    );
}

export default Accueil;
