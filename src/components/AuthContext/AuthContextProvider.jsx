import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const { children } = props;

    const [jeton, setJeton] = useState(null);
    const [utilisateur, setUtilisateur] = useState(null);

    useEffect(() => {
        const jetonSauvegarde = localStorage.getItem("jeton");
        if (jetonSauvegarde && validerJeton(jetonSauvegarde)) {
            setJeton(jetonSauvegarde);
        } else {
            deconnexion();
        }
    }, []);

    useEffect(() => {
        if (validerJeton(jeton)) {
            const { nom, courriel, role } = jwtDecode(jeton);
            setUtilisateur({ nom, courriel, role });
        } else {
            setUtilisateur(null);
        }
    }, [jeton]);

    function validerJeton(jeton) {
        if (!jeton) return false;
        try {
            const decode = jwtDecode(jeton);
            return decode.exp * 1000 > Date.now();
        } catch (error) {
            return false;
        }
    }

    function connexion(nouveauJeton) {
        if (validerJeton(nouveauJeton)) {
            localStorage.setItem("jeton", nouveauJeton);
            setJeton(nouveauJeton);
        } else {
            deconnexion();
        }
    }

    function deconnexion() {
        localStorage.removeItem("jeton");
        setJeton(null);
        setUtilisateur(null);
    }

    return (
        <AuthContext.Provider value={{ jeton, utilisateur, validerJeton, connexion, deconnexion }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
