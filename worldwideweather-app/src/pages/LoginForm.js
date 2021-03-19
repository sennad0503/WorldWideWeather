import { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm({ setToken }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password || !password2) {
      return setError("All fields are required");
    }

    if (password !== password2) {
      return setError("Passwords do not match");
    }

    const userData = { email, password };
    console.log(userData);

    fetch("https://calm-taiga-37805.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return setError(response.statusText);
      })
      .then((data) => {
        // Update authState in App.js
        setToken(data.token);
        // Store Token in localStorage
        localStorage.setItem("token", data.token);
        // Redirect user profile page
        history.push("/home");
      })
      .catch((err) => setError(err.message));
  }

  return (
    <div className="loginParent-form">
      <div className="login-form">
        <h2>Login</h2>
        {error && <h2>{error}</h2>}
        <form
          className="flex flex-col aligin-center w-1/2 p-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ex: jdoe@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="name">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="name">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
