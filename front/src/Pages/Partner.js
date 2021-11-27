import React from 'react';
import '../assets/Partner.css';

const PartnerPage = () => {
  return (
    <div class="background">
      <div class="flex-parent jc-center">
        <form class="form" action="" method="get">
          <div class="divSpacing">
            <label class="inlineLabel" for="nom">Nom : </label>
            <input type="text" name="Nom" value="" required/>
          </div>
          <div class="divSpacing">
            <label class="inlineLabel" for="contact">N° Téléphone/Email : </label>
            <input type="text" name="Contact" value=""  placeholder="mail@mail.com" required/>
          </div>
          <div class="flex-parent jc-center">
            <button  class="modifButton" type="button"> Ajouter </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerPage;