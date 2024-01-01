import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import "../app/firebaseAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        Swal.fire({
          title: "Successfully Logged in",
          text: "redirecting to another page",
          icon: "success"
        });
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };

  const googleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="register-container">
      <fieldset>
      <legend className="register-heading">Login</legend>
      <form className="register" onSubmit={handleLogin}>
        <label>
          Enter your email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Enter your password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button variant="primary" type="submit">
            Login
          </Button>
        
          <Button variant="primary" type="submit" onClick={googleLogin}>
            Google Sign-in
          </Button>
      </form>
      </fieldset>
    </div>
  );
}

export default Login;
