import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

<<<<<<< Updated upstream
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("A username was submitted " + username);
    console.log("A password was submitted " + password);

=======
  const handleLogin = (e) => {
    e.preventDefault();
    
    setErrorMessage("");

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
        setErrorMessage("Invalid Login");
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
>>>>>>> Stashed changes
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
          <p>{errorMessage}</p>
        </label>
        <button type="submit">Login</button>
        <a href="#">Register an account today!</a>
      </form>
    </div>
  );
}

export default Login;
