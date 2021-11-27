import React from 'react';
import { Link } from "react-router-dom";
import '../assets/Accueil.css';

const AccueilPage = () => {
    return (
        <div class="AccueilContainer">
            <div class="header">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 495">
                <path id="svg_1" d="m-5.33333,48.33331l83.55556,2.42592c98.22223,9.09259 270.66668,36.61111 432.44446,107.13531c161.77778,69.86355 323.55556,123.05105 485.33335,113.63681c161.77778,-8.75359 295.55556,-35.79062 376.44445,-88.64248l80.88889,-52.85186l0,369.96299l-80.88889,0c-131.44445,0 -242.66667,0 -404.44446,0c-161.77778,0 -323.55556,0 -485.33335,0c-161.77778,0 -323.55556,0 -404.44446,0l-80.88889,0l-2.66667,-451.66669z" fill="#97dc8a"/>
                </svg>
                <p class="bang">ACHETEZ DES LEGUMES A VOTRE VOISIN</p>
                <div class="inputcontainer">
                    <p>Recherchez un produit:</p>
                    <input type="text" placeholder="Tomates, Oeufs, ..." />
                    <button>&#62;</button>
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