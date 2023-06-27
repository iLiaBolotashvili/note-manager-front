import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Login, Register, Profile } from "./pages"

import AuthService from "./services/auth"

function App() {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <>
      <nav className='nav w-full h-16 m-0 flex flex-row items-center pl-6 pr-6 shadow-lg'>
        <div className="list-none text-black font-semibold text-2xl h-16 m-0 flex flex-row items-center pl-6 pr-6">
          <li >
            <Link className='grow text-left' to="/">
              Home
            </Link>
          </li>
        </div>
        {currentUser ? (
          <div className="list-none ml-auto h-16 m-0 flex flex-row items-center pl-6 pr-6">
            <li >
              <Link to={"/profile"} className="text-black text-base font-semibold">
                 {currentUser.username}
              </Link>
            </li>
            <li >
              <a href="/login" className="text-black text-base font-semibold pl-2" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="list-none ml-auto h-16 m-0 flex flex-row items-center pl-6 pr-6">
            <li>
              <Link to={"/login"} className="nav-link text-black font-semibold text-base px-1">
                Sign In
              </Link>
            </li>
            <li>
              <Link to={"/register"} className="nav-link text-black font-semibold text-base px-1">
                 Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>


      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
