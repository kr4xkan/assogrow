import React, { useContext, useState } from 'react';
import { Navigate } from "react-router-dom";
import '../assets/Login.css';
import axios from "axios";

import config from '../config';
import AuthContext from '../AuthContext';

const LoginPage = () => {
  const { login, isLoggedIn } = useContext(AuthContext);

  const [toggle, setToggle] = useState(true);

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpwd] = useState("");
  const [passwordconf, setpwdconf] = useState("");

  const sendLogin = async () => {
    if (email.length < 1 || password.length < 1) {
      return;
    }
    axios.post(`${config.api_url}/auth/login`, {
      email,
      password
    }).then(response => {
      login(response.data);
    }).catch(err => console.error(err));
  }

  const sendRegister = async () => {
    if (email.length < 1 || password.length < 1 || password !== passwordconf) {
      return;
    }
    axios.post(`${config.api_url}/auth/register`, {
      username,
      email,
      password
    }).then(() => {
      setToggle(true);
    }).catch(err => console.error(err));
  }

  if (isLoggedIn)
    return (<Navigate to="/dashboard" />)

  return (
    <div class="container">
      { toggle ? (
        <div className="form">
          <div className="input">
            <label for="email">EMAIL</label>
            <input type="text" name="email" placeholder="jacque_houzit@ggh.fr" value={email} onChange={(e) => setemail(e.target.value)} />
          </div>
          <div className="input">
            <label for="password">PASSWORD</label>
            <input type="password" name="password" value={password} onChange={(e) => setpwd(e.target.value)} />
          </div>
          <div className="submit">
            <input className="toggle" type="submit" value="PAS DE COMPTE ?" onClick={() => setToggle(false)} />
            <input className="submit" type="submit" value="SE CONNECTER" onClick={() => sendLogin()} />
          </div>
        </div>
      ) : (
        <div className="form">
          <div className="input">
            <label for="username">NOM D'ASSOCIATION</label>
            <input type="text" name="username" placeholder="Jacque Houzit Corp" value={username} onChange={(e) => setusername(e.target.value)} />
          </div>
          <div className="input">
            <label for="email">EMAIL</label>
            <input type="text" name="email" placeholder="jacque_houzit@ggh.fr" value={email} onChange={(e) => setemail(e.target.value)} />
          </div>
          <div className="input">
            <label for="password">MOT DE PASSE</label>
            <input type="password" name="password" value={password} onChange={(e) => setpwd(e.target.value)} />
          </div>
          <div className="input">
            <label for="passwordconf">CONFIRMER VOTRE MOT DE PASSE</label>
            <input type="password" name="passwordconf" value={passwordconf} onChange={(e) => setpwdconf(e.target.value)} />
          </div>
          <div className="submit">
            <input className="toggle" type="submit" value="DEJA UN COMPTE ?" onClick={() => setToggle(true)} />
            <input className="submit" type="submit" value="S'ENREGISTRER" onClick={() => sendRegister()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;