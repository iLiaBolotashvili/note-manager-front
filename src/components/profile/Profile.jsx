import React from "react";
import AuthService from "../../services/auth.js";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
  <div className="w-96 h-96 text-black my-2 mx-auto">
      <h3>
        <strong>{currentUser.username}</strong> Profile
      </h3>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
    </div>
  );
};

export default Profile;