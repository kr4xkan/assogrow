import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import '../assets/Dashboard.css';
import DossierItem from '../Components/DossierItem';
import Sidebar from '../Components/Sidebar';
import config from '../config';
import DossierPage from './Dossier';
import ListPage from './List';
import PartnerPage from './Partner';
import ProfilePage from './ProfilePage';
import StocksPage from './Stocks';

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
    <div className="dashboard">
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/dossiers" element={<DossierPage />} />
        <Route path="/partenaires" element={<PartnerPage />} />
        <Route path="/stock" element={<StocksPage />} />
      </Routes>
      
      <Sidebar />
    </div>
  );
};

export default DashboardPage;