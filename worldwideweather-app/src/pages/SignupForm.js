import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SignupForm(obj) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !email || !password || !password2) {
      return setError("All fields are required");
    }

    if (password !== password2) {
      return setError("Passwords do not match");
    }

    const newUser = { name, email, password };

    fetch("https://calm-taiga-37805.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        }
        setError(response.statusText);
      })
      .then((data) => {
        console.log(data);
        history.push("/home");
      })
      .catch((err) => setError(err.message));
  }
  return (
    <div className="signupParent-form">
      <div className="signup-form">
        <h1>Sign-up</h1>
        {error && <p className="text-red">{error}</p>}
        <form
          className="flex flex-col aligin-center w-1/2 p-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <div>
            <label htmlFor="password2">Password</label>
            <input
              type="password2"
              id="password2"
              name="password2"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              required
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
