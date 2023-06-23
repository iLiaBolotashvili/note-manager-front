import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.js";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-black text-xs" role="alert">
        This field is required!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 4 || value.length > 10) {
    return (
      <div className="text-black text-xs" role="alert">
        The username must be between 4 and 10 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 4 || value.length > 10) {
    return (
      <div className="text-black text-xs" role="alert">
        The password must be between 4 and 10 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };


  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="flex justify-center items-center w-full mb-8">
      <div className="border-2 p-8 rounded-3xl">

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="flex flex-col mb-12 w-64">
                <p className='text-black font-semibold'>Username</p>
                <Input
                  type="text"
                  className="text-xl rounded p-2 border-2 border-slate-300 border-solid text-black"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
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
                  validations={[required, vpassword]}
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center justify-center flex-col">
                <button className="text-xl font-semibold bg-sky-400 w-32 hover:bg-sky-600 ease-in duration-300 py-2 px-4 rounded-full">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="flex">
              <div className={ successful ? "font-semibold text-black" : "font-semibold shadow text-black" } role="alert">
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

export default Register;