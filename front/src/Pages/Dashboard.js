import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/Dashboard.css';
import DossierItem from '../Components/DossierItem';
import config from '../config';
import ListPage from './List';

const DashboardPage = () => {
  const [dossiers, setDossiers] = useState([]);

  useEffect(() => {
		const token = localStorage.getItem('token');
    axios.get(config.api_url + '/dossier/all', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      setDossiers(res.data);
    }).catch(err => console.error(err));
  }, [])

  return (
    <div className="container">
		  <ListPage data={dossiers} Component={DossierItem} />
    </div>
  );
};

export default DashboardPage;