import React, { useState } from 'react';

const LogoutButton = () => {

  const [loggedOut, setLoggedOut] = useState(false)

  const logout = () => {
    localStorage.removeItem("token")
    setLoggedOut(true)
  };

  if (loggedOut) {
    window.location.replace("/")
  }

  return <a onClick={logout} className="text-blue-800 hover:underline">LogOut</a>;
};

export default LogoutButton;
