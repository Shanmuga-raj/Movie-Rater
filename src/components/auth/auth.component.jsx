import React, { useState, useEffect } from "react";
import API from "../../api-service";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["auth"]);

  useEffect(() => {
    console.log(token);
    if (token["auth"]) window.location.href = "/movies";
  }, [token]);

  const loginClicked = () => {
    API.login({ username, password })
      .then((resp) => setToken("auth", resp.token))
      .catch((error) => console.log(error));
  };

  return (
    <div>
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
      <button onClick={loginClicked}>Login</button>
    </div>
  );
};

export default Auth;
