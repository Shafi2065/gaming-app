import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import "../app/firebaseAuth";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        Swal.fire({
          title: "Successfully Logged in",
          text: "redirecting to another page",
          icon: "success",
        });
      })
      .then(() => {
        setTimeout(() => {
          Swal.close();
          router.push("/");
        }, 2000);
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
    <div className="FormDiv">
      <fieldset>
        <legend>Login</legend>
        <Form id="Form" onSubmit={handleLogin}>
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
            <p>{errorMessage}</p>
          </label>
          <Button variant="primary" type="submit">
            Login
          </Button>

          <Button variant="primary" type="submit" onClick={googleLogin}>
            Google Sign-in
          </Button>
        </Form>
      </fieldset>
    </div>
  );
}

export default Login;
