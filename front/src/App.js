import React, { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import AuthContext from "./AuthContext";

import AccueilPage from './Pages/Accueil';
import DashboardPage from './Pages/Dashboard';
import LoginPage from './Pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AccueilPage />} />
      <Route path="login" element={<LoginPage />} />

      <Route exact path='/dashboard' element={<PrivateRoute/>}>
        <Route exact path='/dashboard' element={<DashboardPage/>}/>
      </Route>
    </Routes>
  );
}


const PrivateRoute = ({component: Component, auth, ...rest}) => {
  const { isLoggedIn } = useContext(AuthContext);
  
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default App;
