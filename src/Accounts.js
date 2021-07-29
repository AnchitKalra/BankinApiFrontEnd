import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import Header from "./Header";
import { Button } from "@material-ui/core";

let i = 1;
class Accounts extends Component {
  addAccountHandler = () => {
    let access = sessionStorage.getItem("access-token");
    let xhr = new XMLHttpRequest();
    let that = this;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let accountsResponse = JSON.parse(this.response);
        console.log(accountsResponse);
        that.props.history.push({
          pathname: "/welcome",
          response: accountsResponse.id,
        });
      }
    });

    xhr.open("POST", "http://localhost:8080/api/addAccount");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader(
      "authorization",
      "Bearer " + sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
  };
  constructor() {
    super();
    this.state = {
      accounts: "",
    };
  }
  componentDidMount() {
    if (sessionStorage.getItem("access-token") == null) {
      this.props.history.push({ pathname: "/" });
    } else {
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
                  <ol key={i++}>
                    <li value={i}>
                      Account Number = {acc.accountNumber} <br />
                      Balance = {acc.balance}
                      <br />
                      Status = {acc.status} <br />
                    </li>
                  </ol>
                );
              })
            : ""}
          <div>
            Do you want to add an Account? <br /> <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={this.addAccountHandler}
            >
              Add Account
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Accounts;
