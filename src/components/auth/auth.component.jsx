import React, { useState, useEffect } from "react";
import API from "../../api-service";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["auth"]);
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    if (token["auth"]) window.location.href = "/movies";
  }, [token]);

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
    <div>
      {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
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
        <button onClick={loginClicked}>Login</button>
      ) : (
        <button onClick={registerClicked}>Register</button>
      )}

      {isLoginView ? (
        <p>
          Don't have an account?
          <span onClick={() => setIsLoginView(false)}>Register!</span>
        </p>
      ) : (
        <p>
          Already have an account?
          <span onClick={() => setIsLoginView(true)}> Login!</span>
        </p>
      )}
    </div>
  );
};

export default Auth;
