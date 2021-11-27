import React from "react";
import "../assets/Search.css";
import database from "../assets/csvjson.json";
import AutoComplete from "./Autocomplete";

const SearchPage = () => {
  return (
    <div class="background flex-parent jc-center">
      <div>
        <div>
          <AutoComplete data={database} />
        </div>
      </div>
      <div>
        <button class="searchButton" type="button">
          Rechercher
        </button>
      </div>
    </div>
  );
};
export default SearchPage;
