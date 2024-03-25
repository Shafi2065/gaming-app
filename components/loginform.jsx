import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../app/firebaseAuth";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const regex = /.com$/;

    const validateInputs = () => {
      if (!email.trim()) {
        setErrorMessage("Please enter your email");
        return false;
      }
      if (!password.trim()) {
        setErrorMessage("Please enter your password");
        return false;
      }
      const emailRegex = /.+@.+\..+/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email address");
        return false;
      }
      return true;
    };

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    if (validateInputs()) {
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        Swal.fire({
          title: "Successfully Logged in",
          text: "redirecting to another page",
          icon: "success",
        });
        setErrorMessage("");
      })
      .then(() => {
        setTimeout(() => {
          Swal.close();
          router.push("/");
        }, 2000);
      })
      .catch((error) => {
        console.error(error.code, error.message);
        if (error.code === "auth/invalid-email") {
          setErrorMessage("Invalid email address");
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage("User not found");
        }
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
            <p style={{ color: "red" }}>{errorMessage}</p>
          </label>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Link href="./login/register">
            {"Don't have an account? Register here"}
          </Link>
        </Form>
      </fieldset>
    </div>
  );
}

export default Login;
