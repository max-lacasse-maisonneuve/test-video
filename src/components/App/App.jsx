import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ListeFilms from "../ListeFilms/ListeFilms";
import Accueil from "../Accueil/Accueil";
import DetailFilm from "../DetailFilm/DetailFilm";
import FormulaireAjoutFilm from "../FormulaireAjoutFilm/FormulaireAjoutFilm";
import AuthContextProvider from "../AuthContext/AuthContextProvider";
import AdminRoute from "../AdminRoute/AdminRoute";
import { HelmetProvider } from "react-helmet-async";
function App() {
    return (
        <>
            <HelmetProvider>
                <AuthContextProvider>
                    <Header />

                    <Routes>
                        <Route path="/" element={<Accueil />} />
                        <Route path="/films" element={<ListeFilms />} />
                        <Route element={<AdminRoute />}>
                            <Route path="/films/ajout" element={<FormulaireAjoutFilm />} />
                        </Route>
                        <Route path="/films/:id" element={<DetailFilm />} />
                    </Routes>
                    <Footer />
                </AuthContextProvider>
            </HelmetProvider>
        </>
    );
}

export default App;
