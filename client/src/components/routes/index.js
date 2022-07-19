
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import NavBar from "../NavBar";

const index = () => {
    return(
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={Profil} />
            </Routes>
        </Router>
    )
}

export default index;