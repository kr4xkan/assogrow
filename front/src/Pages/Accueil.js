import React from "react";
import { Link } from "react-router-dom";
import "../assets/Accueil.css";
import AutoComplete from "../Components/Autocomplete";
import database from "../assets/csvjson.json";

import image from "../assets/logo_hackathon.png";

const AccueilPage = () => {
  return (
    <div class="AccueilContainer">
      <div class="header">
        <img src={image} width="700"/>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 495">
          <path
            id="svg_1"
            d="m-5.33333,48.33331l83.55556,2.42592c98.22223,9.09259 270.66668,36.61111 432.44446,107.13531c161.77778,69.86355 323.55556,123.05105 485.33335,113.63681c161.77778,-8.75359 295.55556,-35.79062 376.44445,-88.64248l80.88889,-52.85186l0,369.96299l-80.88889,0c-131.44445,0 -242.66667,0 -404.44446,0c-161.77778,0 -323.55556,0 -485.33335,0c-161.77778,0 -323.55556,0 -404.44446,0l-80.88889,0l-2.66667,-451.66669z"
            fill="#97dc8a"
          />
        </svg>
        <Link class="login" to="/login">
          SE CONNECTER
        </Link>
      </div>
      <div class="content">
        <div>
          <h3> A propos de nous </h3>
          <p>
            Nous sommes 4 développeurs étudiants et avons décidé de créer AssoGrow. Nous savons ce qu'est la vie d'étudiants et combien elle peut être difficile pour ceux qui ont peu de moyens.
            En discutant avec des membres d'une banque alimentaire, nous nous sommes dit qu'il pourrait leur être utile d'avoir une plateforme pour gérer la majorité de leurs actions.
            <br/>Via la plateforme AssoGrow, vous, les banques alimentaires, vous pourrez gérer les dossiers d'admission, gérer les partenaires avec qui vous échangez, mais aussi
            gérer les stocks de réductions, dons et promotions de vos partenaires.
          </p>
        </div>
        <div>
          <h3> Un abonnement intéressant </h3>
          <p>
            Notre plateforme ne peut, malheureusement, vous être dispensée gratuitement, en raison des coûts des infrastructures. Cependant, nous faisons tout notre possible pour maintenir le tarif de l'abonnements au plus bas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccueilPage;
