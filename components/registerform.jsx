import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleValidation = () => {
    if (password === "") {
      setErrorMessage("Please enter a password");
    } else if (password.search(/[a-z]/) < 0) { 
      console.log("Password does not contain a lowercase letter");
      setErrorMessage("Password must contain a lowercase letter");
    } else if (password.length < 8) {
      console.log("Password less than 8 characters");
      setErrorMessage("Password must contain at least 8 characters");
    } else if (password.search(/[A-Z]/) < 0) {
      setErrorMessage("Password must contain a capital letter");
    } else if (password.search(/[0-9]/) < 0) {
      console.log("Password does not have a number");
      setErrorMessage("Password must contain a digit");
    } else {
      console.log("Password successful");
      setErrorMessage("Password is valid");
    }
};
  // Call this function when submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation before submitting
    handleValidation();
    // Continue with form submission logic if needed
    console.log("A username was submitted " + username);
    console.log("A password was submitted " + password);
  };

  return (
    <div className="register-container">
        <fieldset>
        <legend className="register-heading">Register</legend>
      <form className="register" onSubmit={handleSubmit}>
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>{errorMessage}</p>
        </label>
        <button type="submit">Register</button>
      </form>
      </fieldset>
    </div>
  );
}

export default Register;
