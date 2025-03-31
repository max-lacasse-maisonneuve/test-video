import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContextProvider";

function AdminRoute() {
    const { jeton, utilisateur, validerJeton } = useContext(AuthContext);
    if (validerJeton(jeton) && utilisateur.role == 0) {
        return <Outlet></Outlet>;
    } else {
        return <Navigate to="/" />;
    }
}

export default AdminRoute;
