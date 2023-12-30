import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../app/firebaseAuth';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        <h6>Succesfully signed in</h6>
      })
      .catch((error) => {
        console.error(error.code, error.message);
        <h6 color="red">Error signing in</h6>
      });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <a href="#">Register an account today!</a>
      </form>
    </div>
  );
}

export default Login;
