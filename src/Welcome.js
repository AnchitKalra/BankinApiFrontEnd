import React, { Component } from "react";
import "@fontsource/roboto";
import { Typography } from "@material-ui/core";
import Header from "./Header";
import "./Welcome.css";

class Welcome extends Component {
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
        </div>
      </div>
    );
  }
}
export default Welcome;
