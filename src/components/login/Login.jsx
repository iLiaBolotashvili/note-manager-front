import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.js";

const required = (value) => {
  if (!value) {
    return (
      <div className="font-semibold text-center text-black" role="alert">
       Required field!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full mb-8">
      <div className="border-2 p-8 rounded-3xl">
        <Form onSubmit={handleLogin} ref={form}>
          <div className="flex flex-col mb-12 w-64">
          <p className='text-black font-semibold'>Username</p>
            <Input
              type="text"
              className="text-xl rounded p-2 border-2 border-slate-300 border-solid text-black"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col mb-12 w-64">
            <p className='text-black font-semibold'>Password</p>
            <Input
              type="password"
              className="text-xl rounded p-2 border-2 border-slate-300 border-solid text-black"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              autoComplete="off"
            />
          </div>

            <div className="flex items-center justify-center flex-col">
              <button className="text-xl font-semibold bg-sky-400 w-32 hover:bg-sky-600 ease-in duration-300 py-2 px-4 rounded-full">Login</button>
            </div>

            {message && (
            <div className="flex items-center justify-center">
              <div className={ message ? "font-semibold text-center text-black" : "font-semibold text-center shadow text-black" } role="alert">
                {message}
              </div>
            </div>
          )}
          
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
