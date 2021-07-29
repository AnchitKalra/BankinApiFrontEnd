import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import Header from "./Header";

let i = 1;
class Accounts extends Component {
  constructor() {
    super();
    this.state = {
      accounts: "",
    };
  }
  componentDidMount() {
    let xhr = new XMLHttpRequest();
    let that = this;
    console.log("DID MOUNT");
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let accountsResponse = JSON.parse(this.response);
        that.setState({
          accounts: accountsResponse,
        });
      }
    });

    xhr.open("GET", "http://localhost:8080/api/getAccount");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader(
      "authorization",
      "Bearer " + sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
  }
  render() {

    return (
      <div>
        <Header
          heading="TRIPTI BANK ACCOUNTS PAGE"
          history={this.props.history}
        />
        <div>
          {this.state.accounts.accountList !== undefined
            ? this.state.accounts.accountList.map((acc) => {
                return (
                  <Typography key={i++}>
                    <span>
                      Account Number = {acc.accountNumber}
                      <br />
                      Balance = {acc.balance}
                      <br />
                      Status = {acc.status} <br />
                    </span>
                  </Typography>
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}
export default Accounts;
