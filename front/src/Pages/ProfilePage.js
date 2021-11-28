import React, { useContext } from "react";
import "../assets/Sidebar.css";
import AuthContext from "../AuthContext";

const ProfilePage = () => {
  let context = useContext(AuthContext);
  return (
    <div id="profile">
      <h3 class="title"> Page de profil de {context.name} </h3>
      <p class="text">Votre email: {context.email} </p>
    </div>
  );
};

export default ProfilePage;
