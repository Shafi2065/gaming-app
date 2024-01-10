import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../app/firebaseAuth";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRegistration = (e) => {
    e.preventDefault();

    // Password validation
    if (password === "") {
      setErrorMessage("Please enter a password");
    } else if (password.search(/[a-z]/) < 0) {
      setErrorMessage("Password must contain a lowercase letter");
    } else if (password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters");
    } else if (password.search(/[A-Z]/) < 0) {
      setErrorMessage("Password must contain a capital letter");
    } else if (password.search(/[0-9]/) < 0) {
      setErrorMessage("Password must contain a digit");
    } else {
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(userCredential);
          setRegistrationSuccess(true);
          setErrorMessage("");
          handleShow();
        })
        .catch((error) => {
          console.error(error.code, error.message);
          setErrorMessage("Registration failed. Please try again.");
        });
    }
  };

  return (
    <div className="register-container">
      <fieldset>
        <legend className="register-heading">Register</legend>
        <form className="register" onSubmit={handleRegistration}>
          <label>
            Enter your Email:
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Enter your Password:
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>{errorMessage}</p>
          </label>

          {registrationSuccess && (
            <p style={{ color: "green" }}>Successfully Registered</p>
          )}

          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header>
              <Modal.Title>Successfully Registered</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your web page is being redirected in 2 seconds
            </Modal.Body>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </form>
      </fieldset>
    </div>
  );
}

export default Register;
