import React, { useEffect, useState } from "react";
import "../assets/Dossier.css";
import axios from "axios";

import config from "../config";
import List from "./List";
import AutoComplete from "../Components/Autocomplete";
import LeaseItem from "../Components/LeaseItem";

const LeasePage = () => {
  const [lease, setlease] = useState([]);

  const [stock, setstock] = useState("");
  const [dossier, setdossier] = useState("");
  const [date, setdate] = useState("");

  const [stocks, setstocks] = useState([]);
  const [dossiers, setdossiers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(config.api_url + "/lease/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      setlease(res.data);
    }).catch((err) => console.error(err));

    axios.get(config.api_url + "/dossier/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      let filtered = res.data.filter((v) => v.status === 2);
      if (filtered.length > 0) setdossier(filtered[0]._id);
      setdossiers(filtered);
    }).catch((err) => console.error(err));

    axios.get(config.api_url + "/stocks/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.data.length > 0) setstock(res.data[0]._id);
      setstocks(res.data);
    }).catch((err) => console.error(err));
  }, []);

  const refresh = () => {
    const token = localStorage.getItem("token");
    axios
      .get(config.api_url + "/lease/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setlease(res.data);
      })
      .catch((err) => console.error(err));
  };

  const create = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      date,
      dossier,
      item: stock
    };
    axios
      .post(config.api_url + "/lease/add", data, {
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
          title="Pour qui ?"
          data={dossiers}
          value={dossier}
          onChange={(e) => setdossier(e.target.value)}
        />
        <AutoComplete
          title="Quelle promos ?"
          data={stocks}
          value={stock}
          onChange={(e) => setstock(e.target.value)}
        />
        <div className="input">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            name="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <input className="send" type="submit" value="ATTRIBUER" />
      </form>
      <div className="list">
        <List data={lease} Component={LeaseItem} />
      </div>
    </div>
  );
};

export default LeasePage;
