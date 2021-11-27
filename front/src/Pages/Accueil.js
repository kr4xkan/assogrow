import React from 'react';
import '../assets/Accueil.css';

const AccueilPage = () => {
    return (
        <div class="AccueilContainer Iam">

            <img class="LogoIMG" src="../logo.svg"/>
            <h1>
                <p class="Iam">Je suis </p>
            </h1>


            <button class="myButton">Se connecter</button>
            <button class="Prod">Producteur</button>
            <button class="Entreprise">Entreprise</button>

            <scroll-container>
            </scroll-container>
        </div>
    );
};

export default AccueilPage;