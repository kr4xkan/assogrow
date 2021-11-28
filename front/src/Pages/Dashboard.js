import React, { useState } from 'react';
import '../assets/Dashboard.css';
import Sidebar from '../Components/Sidebar';
import DossierPage from './Dossier';
import LeasePage from './Lease';
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
      case 4:
        return (<LeasePage />);
    
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