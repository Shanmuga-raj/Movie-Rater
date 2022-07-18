import React, { useState, useEffect } from "react";
import API from "../../api-service";
import { useCookies } from "react-cookie";
import "./auth.styles.css";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken, removeToken] = useCookies(["auth"]);
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    if (token["auth"]) window.location.href = "/movies";
    if (token["auth"] === 'undefined') {removeToken(["auth"])};
  }, [token, removeToken]);

  const loginClicked = () => {
    API.login({ username, password })
      .then((resp) => setToken("auth", resp.token))
      .catch((error) => console.log(error));
  };

  const registerClicked = () => {
    API.register({ username, password })
      .then(() => loginClicked())
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="Auth-header">
        {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
      </header>
      <div className="auth-container">
        <label htmlFor="username">Username</label>
        <br />
        <input
          id="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        {isLoginView ? (
          <button className="auth-button" onClick={loginClicked}>
            <span>Login</span>
          </button>
        ) : (
          <button className="auth-button" onClick={registerClicked}>
            <span>Register</span>
          </button>
        )}

        {isLoginView ? (
          <p>
            Don't have an account?
            <u onClick={() => setIsLoginView(false)}>Register!</u>
          </p>
        ) : (
          <p>
            Already have an account?
            <u onClick={() => setIsLoginView(true)}>Login!</u>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
