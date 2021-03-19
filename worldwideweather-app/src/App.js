import React from "react";
import "./App.css";
import Navbar from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import AboutPage from './pages/AboutPage';
import ViewPage from "./pages/ViewPage";
import LandingPage from "./pages/LandingPage";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/view" component={ViewPage} />
        {/* <Route path="/about" component={AboutPage} /> */}
        <Route path="/signup" component={SignupForm} />
        <Route
          path="/login"
          component={() => <LoginForm setToken={setToken} />}
        />
        <div>
          <Route token={token} setToken={setToken} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
