import React from 'react';
import '../assets/Profil.css';

const ProfilPage = () => {
  return (
    <div class="background">
      <div class="flex-parent jc-center">
        <form class="form" action="" method="get">
          <div class="divSpacing">
            <label class="inlineLabel" for="email">Email : </label>
            <input type="email" name="Email" value="mail@mail.com" required disabled/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="telNumber">N° Téléphone : </label>
            <input type="tel" name="TelNumber" value="00 00 00 00 00" required disabled/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="adresse">Adresse : </label>
            <input type="text" name="Adresse" value="86 Bd Marius Vivier Merle, 69003 Lyon" required disabled/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="mdp">Mot de passe : </label>
            <input type="password" name="Mdp" value="*********" required disabled/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="mdpVerif">Réentrez le mot de passe : </label>
            <input type="password" name="MdpVerif" value="**********" required disabled/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="avatar">Avatar : </label>
            <input type="file" name="Avatar" required disabled/>
          </div>
          <div class="flex-parent jc-center">
            <button  class="modifButton" type="button"> Modifier </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilPage;