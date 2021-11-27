import React, { useContext, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import '../assets/Login.css';
import axios from "axios";

import config from '../config';
import AuthContext from '../AuthContext';

const LoginPage = () => {
  const { login, isLoggedIn } = useContext(AuthContext);

  const [name, setname] = useState("");
  const [siret, setsiret] = useState("");
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [address, setaddress] = useState("");

  const register = async () => {
    axios.post(`${config.api_url}/auth/register`, {
      name,
      siret,
      email,
      password: pwd,
      address
    }).then(response => {
      login(response);
    }).catch(err => console.error(err));
  }

  if (isLoggedIn)
    return (<Navigate to="/dashboard" />)

  return (
    <div class="background">
      <div>
        <Link class="signupButton" to="/">Accueil</Link>
      </div>
      <div class="flex-parent jc-center">
        <form class="form" action="" method="get">
          <div class="divSpacing">
            <label class="inlineLabel" htmlFor="accountLabel">*Type de compte : </label>
            <input class="inputTab" type="radio" id="AccountType1" name="AccountType" value="producteur"/>
            <label class="labelTab" htmlFor="AccountType1">Producteur</label>
            <input class="inputTab" type="radio" id="AccountType2" name="AccountType" value="entreprise"/>
            <label class="labelTab" htmlFor="AccountType2">Entreprise</label>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" htmlFor="societyName">*Nom de l'entreprise : </label>
            <input type="text" name="SocietyName" required value={name} onChange={(e) => setname(e.target.value)} />
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" htmlFor="siretNumber">*N° SIRET : </label>
            <input type="text" name="SiretNumber" required value={siret} onChange={(e) => setsiret(e.target.value)}/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" htmlFor="email">*Email : </label>
            <input type="email" name="Email" required value={email} onChange={(e) => setemail(e.target.value)}/>
          </div>
          {/* <div class="divSpacing">
            <label class="inlineLabel" htmlFor="telNumber">*N° Téléphone : </label>
            <input type="tel" name="TelNumber" required value={name} onChange={(e) => setname(e.target.value)}/>
          </div> */}
          <div class="divSpacing">
            <label class="inlineLabel" htmlFor="adresse">*Adresse : </label>
            <input type="text" name="Adresse" required value={address} onChange={(e) => setaddress(e.target.value)}/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" htmlFor="mdp">*Mot de passe : </label>
            <input type="password" name="Mdp" required value={pwd} onChange={(e) => setpwd(e.target.value)}/>
          </div>
          {/* <div class="divSpacing">
            <label class="inlineLabel" htmlFor="mdpVerif">*Réentrez le mot de passe : </label>
            <input type="password" name="MdpVerif" required/>
          </div> */}
          <div class="divSpacing">
            <label class="asteriskExplanation">(*) Champ(s) obligatoire(s)</label>
          </div>
          <div class="flex-parent jc-center">
            <button class="signupButton" type="button" onClick={() => register()}> S'inscrire </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;