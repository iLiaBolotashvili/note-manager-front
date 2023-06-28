import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Login, Register, Profile } from "./pages"
import { Footer } from "./components"

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
      <nav className='nav w-full h-16 m-0 flex flex-row items-center shadow-lg'>
        {currentUser ? (
          <div className="list-none mx-auto my-0 h-16 flex flex-row items-center pl-6 pr-6">
            <li  className='px-4'>
              <Link to={"/profile"} className="nav-link text-black font-semibold text-xl px-1">
                 {currentUser.username}
              </Link>
            </li>
            <li>
              <a href="/login" className="text-black text-xl font-semibold pl-2" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="list-none mx-auto my-0 h-16 flex flex-row items-center">
            <li className='px-4'>
              <Link to={"/login"} className="nav-link text-black font-semibold text-xl px-1">
                Sign In
              </Link>
            </li>
            <li className='px-4'>
              <Link to={"/register"} className="nav-link text-black font-semibold text-xl px-1">
                 Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>


      <div className="my-32">
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App
