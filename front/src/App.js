import React, { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import AuthContext from "./AuthContext";

import AccueilPage from './Pages/Accueil';
import DashboardPage from './Pages/Dashboard';
import DossierPage from "./Pages/Dossier";
import LoginPage from './Pages/Login';
import PartnerPage from "./Pages/Partner";
import StocksPage from "./Pages/Stocks";

function App() {

  return (
    <Routes>
      <Route path="/" element={<AccueilPage />} />
      <Route path="/d" element={<DossierPage />} />
      <Route path="/p" element={<PartnerPage />} />
      <Route path="/s" element={<StocksPage />} />
      <Route path="login" element={<LoginPage />} />

      <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<DashboardPage/>}/>
      </Route>
    </Routes>
  );
}


const PrivateRoute = ({component: Component, auth, ...rest}) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default App;
