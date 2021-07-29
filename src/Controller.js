import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";
import LoginPage from "./LoginPage";
import Accounts from "./Accounts";

class Controller extends Component {
  constructor() {
    super();
    this.baseUrl = "http://localhost:8080/api/";
  }

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route
            exact
            path="/"
            render={(props) => <Login {...props} baseUrl={this.baseUrl} />}
          />
          <Route
            exact
            path="/welcome"
            render={(props) => <Welcome {...props} baseUrl={this.baseUrl} />}
          />

          <Route
            exact
            path="/login"
            render={(props) => <LoginPage {...props} baseUrl={this.baseUrl} />}
          />

          <Route
            exact
            path="/accounts"
            render={(props) => <Accounts {...props} baseUrl={this.baseUrl} />}
          />
        </div>
      </Router>
    );
  }
}
export default Controller;
