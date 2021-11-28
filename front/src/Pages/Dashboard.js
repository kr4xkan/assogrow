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
  /**
   * 0 - profile
   * 1 - dossier
   * 2 - partenaire
   * 3 - stock
   */
  const [page, setpage] = useState(0);

  function getPage() {
    switch (page) {
      case 1:
        return (<DossierPage />);
      case 2:
        return (<PartnerPage />);
      case 3:
        return (<StocksPage />);
    
      default:
        return (<ProfilePage />);
    }
  }

  return (
    <div className="dashboard">
      {getPage()}
      
      <Sidebar setpage={setpage}/>
    </div>
  );
};

export default DashboardPage;