import React from 'react';
import '../assets/Search.css';

const SearchPage = () => {
  return (
    <div class="background flex-parent jc-center">
      <div>
        <input class="inputF" type="text" name="ingredient" placeholder="Ingredient" autoComplete="on"/>
        <button class="inputF addIngre" type="button"> <strong> + </strong> </button>
      </div>
      <div>
        <button class="searchButton" type="button"> Rechercher </button>
      </div>
    </div>
  );
};

export default SearchPage;