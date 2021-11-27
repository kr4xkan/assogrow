import React from 'react';
import { Link } from "react-router-dom";
import '../assets/Login.css';

const LoginPage = () => {
  return (
    <div class="background">
      <div>
        <Link class="signupButton" to="/">Accueil</Link>
      </div>
      <div class="flex-parent jc-center">
        <form class="form" action="" method="get">
          <div class="divSpacing">
            <label class="inlineLabel" for="accountLabel">*Type de compte : </label>
            <input class="inputTab" type="radio" id="AccountType1" name="AccountType" value="producteur"/>
            <label class="labelTab" for="AccountType1">Producteur</label>
            <input class="inputTab" type="radio" id="AccountType2" name="AccountType" value="entreprise"/>
            <label class="labelTab" for="AccountType2">Entreprise</label>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="societyName">*Nom de l'entreprise : </label>
            <input type="text" name="SocietyName" required/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="siretNumber">*N° SIRET : </label>
            <input type="text" name="SiretNumber" required/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="email">*Email : </label>
            <input type="email" name="Email" required/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="telNumber">*N° Téléphone : </label>
            <input type="tel" name="TelNumber" required/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="adresse">*Adresse : </label>
            <input type="text" name="Adresse" required/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="mdp">*Mot de passe : </label>
            <input type="password" name="Mdp" required/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="mdpVerif">*Réentrez le mot de passe : </label>
            <input type="password" name="MdpVerif" required/>
          </div>
          <div class="divSpacing">
            <label class="asteriskExplanation">(*) Champ(s) obligatoire(s)</label>
          </div>
          <div class="flex-parent jc-center">
            <button  class="signupButton" type="button"> S'inscrire </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;