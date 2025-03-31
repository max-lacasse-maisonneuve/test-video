import "./Footer.css";

function Footer() {
    const annee = new Date().getFullYear();
    return <footer>&copy; Tous droits réservés {annee}</footer>;
}

export default Footer;
