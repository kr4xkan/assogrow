import React, { useEffect, useState } from "react";
import "../assets/Dossier.css";
import axios from "axios";

import config from "../config";
import List from "./List";
import AutoComplete from "../Components/Autocomplete";
import StockItem from "../Components/StockItem";

const StocksPage = () => {
  const [stocks, setstocks] = useState([]);

  const [partenaire, setpartner] = useState("");
  const [quantite, setquantite] = useState("");
  const [item, setitem] = useState("");

  const [partenaires, setPartenaire] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(config.api_url + "/stocks/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setstocks(res.data);
      })
      .catch((err) => console.error(err));
    axios
      .get(config.api_url + "/partenaires/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.length > 0) setpartner(res.data[0]._id);
        setPartenaire(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const refresh = () => {
    const token = localStorage.getItem("token");
    axios
      .get(config.api_url + "/stocks/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setstocks(res.data);
      })
      .catch((err) => console.error(err));
  };

  const create = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      item,
      partenaire,
      quantite,
    };
    axios
      .post(config.api_url + "/stocks/add", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => refresh())
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <form className="formdos formstock" onSubmit={create}>
        <AutoComplete
          title="Partenaire"
          data={partenaires}
          value={partenaire}
          onChange={(e) => setpartner(e.target.value)}
        />
        <div className="input">
          <label htmlFor="item"> Offre </label>
          <input
            type="text"
            name="item"
            value={item}
            onChange={(e) => setitem(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="quantite"> Quantité </label>
          <input
            type="text"
            name="quantite"
            value={quantite}
            onChange={(e) => setquantite(e.target.value)}
          />
        </div>
        <input className="send" type="submit" value="AJOUTER AU STOCK" />
      </form>
      <div className="list">
        <List data={stocks} Component={StockItem} />
      </div>
    </div>
  );
};

export default StocksPage;
