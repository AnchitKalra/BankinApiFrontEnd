import React, { Component } from "react";
import "@fontsource/roboto";
import { Typography } from "@material-ui/core";
import Header from "./Header";
import "./Welcome.css";
import { Button } from "@material-ui/core";

class Welcome extends Component {
  loginHandler = (e) => {
    this.props.history.push({ pathname: "/login" });
  };
  render() {
    return (
      <div>
        <Header heading="TRIPTI BANK WELCOME" history={this.props.history} />
        {console.log(this.props.history.location.response)}
        <div className="main-container">
          <Typography variant="h6">
            Welcome! You have successfully signed up. Your A/C number is:
            <br />
            <span>{"" + this.props.history.location.response}</span>
            <br></br>
            Thank You for chosing Tripti Bank.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={this.loginHandler}
          >
            LOGIN
          </Button>
        </div>
      </div>
    );
  }
}
export default Welcome;
