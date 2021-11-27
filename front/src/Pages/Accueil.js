import React from 'react';
import { Link } from "react-router-dom";
import '../assets/Accueil.css';

const AccueilPage = () => {
    return (
        <div class="AccueilContainer">
            <div class="header">
                <p class="bang">LA PLATEFORME DE COMMERCE LOCAL ET SAISONNIER</p>
                <p class="selectorText">JE SUIS UN.E</p>
                <div class="buttons">
                    <button>PRODUCTEUR</button>
                    <button>ENTREPRISE</button>
                </div>
                <Link class="login" to="/login">SE CONNECTER</Link>
            </div>
            <div class="content">
                <div>
                    <h3>Title</h3>
                    <p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum </p>
                </div>
                <div>
                    <h3>Title</h3>
                    <p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum </p>
                </div>
                <div>
                    <h3>Title</h3>
                    <p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum </p>
                </div>
            </div>
        </div>
    );
};

export default AccueilPage;