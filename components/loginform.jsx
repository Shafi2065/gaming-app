import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("A username was submitted " + username);
    console.log("A password was submitted " + password);

  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Enter your password:
          <input
            type="password"
            value={password}
            onChange={(e) => handlePassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        <a href="#">Register an account today!</a>
      </form>
    </div>
  );
}

export default Login;
