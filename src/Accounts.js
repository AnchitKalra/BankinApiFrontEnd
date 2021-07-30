import { FormControl, FormHelperText } from "@material-ui/core";
import React, { Component } from "react";
import Header from "./Header";
import { Button, Input, InputLabel, FormGroup } from "@material-ui/core";
import "./Account.css";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { faRupeeSign, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let i = 1;
class Accounts extends Component {
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ showMessage: false });
  };

  onTransfer = (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let that = this;
    let account1 = e.target.account1.value;
    let account2 = e.target.account2.value;
    let amounts = e.target.amount.value;
    //console.log("Hi from oncredit " + account1 + amounts);
    let accountRequest = {
      from_account_number: account1,
      to_account_number: account2,
      amount: amounts,
    };
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("HI from 4");
        let b = JSON.parse(this.response);
        console.log(b);
        if (b.status !== 500) {
          that.setState({
            successMessage: "Amount Successfully Transferred",
            showMessage: true,
          });
        } else {
          that.setState({
            successMessage: "Please check Account Number or Amount",
            showMessage: true,
          });
        }
      }
    });

    xhr.open("PUT", this.props.baseUrl + "transfer");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader(
      "authorization",
      "Bearer " + sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(JSON.stringify(accountRequest));
  };

  onStatement = (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let that = this;
    let accountNumber = e.target.account.value;
    console.log("Hi from oncredit " + accountNumber);
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let b = JSON.parse(this.response);
        console.log(b);
        that.props.history.push({ pathname: "/statement", response: b });
      }
    });

    xhr.open(
      "GET",
      this.props.baseUrl + "statement?accountNumber=" + accountNumber
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader(
      "authorization",
      "Bearer " + sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
  };

  onDebit = (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let that = this;
    let account = e.target.account.value;
    let amounts = e.target.amount.value;
    console.log("Hi from oncredit " + account + amounts);
    let accountRequest = {
      account_number: account,
      amount: amounts,
    };
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("HI from 4");
        let b = JSON.parse(this.response);
        console.log(b);
        if (b.status !== 500) {
          that.setState({
            successMessage: "Account Successfully debited",
            showMessage: true,
          });
        } else {
          that.setState({
            successMessage: "Please check Account Number or Amount",
            showMessage: true,
          });
        }
      }
    });

    xhr.open("PUT", this.props.baseUrl + "debit");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader(
      "authorization",
      "Bearer " + sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(JSON.stringify(accountRequest));
  };
  onCredit = (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let that = this;
    let account = e.target.account.value;
    let amounts = e.target.amount.value;
    console.log("Hi from oncredit " + account + amounts);
    let accountRequest = {
      account_number: account,
      amount: amounts,
    };
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("HI from 4");
        let b = JSON.parse(this.response);
        console.log(b);
        if (b.status !== 500) {
          that.setState({
            successMessage: "Account Successfully credited",
            showMessage: true,
          });
        } else {
          that.setState({
            successMessage: "Please check Account Number or Amount",
            showMessage: true,
          });
        }
      }
    });

    xhr.open("PUT", this.props.baseUrl + "credit");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader(
      "authorization",
      "Bearer " + sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(JSON.stringify(accountRequest));
  };

  creditHandler = () => {
    let a = document.getElementsByClassName("credit-form")[0];
    a.setAttribute("style", "display : block");
  };

  debitHandler = () => {
    let a = document.getElementsByClassName("credit-form")[1];
    a.setAttribute("style", "display : block");
  };

  transferHandler = () => {
    let a = document.getElementsByClassName("credit-form")[2];
    a.setAttribute("style", "display : block");
  };

  statementHandler = () => {
    let a = document.getElementsByClassName("credit-form")[3];
    a.setAttribute("style", "display : block");
  };

  addAccountHandler = () => {
    let xhr = new XMLHttpRequest();
    let that = this;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let accountsResponse = JSON.parse(this.response);
        console.log(accountsResponse);
        sessionStorage.clear();
        that.props.history.push({
          pathname: "/welcome",
          response: accountsResponse.id,
        });
      }
    });

    xhr.open("POST", this.props.baseUrl + "addAccount");
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
      showMessage: false,
      successMessage: "",
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

      xhr.open("GET", this.props.baseUrl + "getAccount");
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
    i = 1;
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
                      Balance = <FontAwesomeIcon icon={faRupeeSign} />
                      {acc.balance}
                      <br />
                      Status = <FontAwesomeIcon icon={faCircle} />
                      {acc.status} <br />
                    </li>
                  </ol>
                );
              })
            : ""}
          <div className="main-btn-container">
            <div>
              Add an Account? <br /> <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={this.addAccountHandler}
                id="btnac"
              >
                Add
              </Button>
            </div>
            <div>
              Credit the Account?
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={this.creditHandler}
                id="btn"
              >
                CREDIT
              </Button>
              <form className="credit-form" onSubmit={this.onCredit}>
                <FormGroup>
                  <FormControl required={true}>
                    <InputLabel htmlFor="account" id="label">
                      Account Number
                    </InputLabel>
                    <Input id="account" name="account" />
                    <FormHelperText htmlFor="account">
                      The account you wish to credit
                    </FormHelperText>
                  </FormControl>
                  <FormControl required={true}>
                    <InputLabel htmlFor="amount" id="label">
                      Amount
                    </InputLabel>
                    <Input id="amount" />
                    <FormHelperText htmlFor="amount">
                      The amount you wish to credit
                    </FormHelperText>
                  </FormControl>
                </FormGroup>
                <Button variant="contained" color="primary" type="submit">
                  SUBMIT
                </Button>
              </form>
            </div>
            <div>
              Debit the Account?
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={this.debitHandler}
                id="btn"
              >
                DEBIT
              </Button>
              <form className="credit-form" onSubmit={this.onDebit}>
                <FormGroup>
                  <FormControl required={true}>
                    <InputLabel htmlFor="account" id="label">
                      Account Number
                    </InputLabel>
                    <Input id="account" name="account" />
                    <FormHelperText htmlFor="account">
                      The account you wish to debit from
                    </FormHelperText>
                  </FormControl>
                  <FormControl required={true}>
                    <InputLabel htmlFor="amount" id="label">
                      Amount
                    </InputLabel>
                    <Input id="amount" />
                    <FormHelperText htmlFor="amount">
                      The amount you wish to credit to
                    </FormHelperText>
                  </FormControl>
                </FormGroup>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btn"
                >
                  SUBMIT
                </Button>
              </form>
            </div>
            <div>
              Transfer Money?
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={this.transferHandler}
                id="btn"
              >
                TRANSFER
              </Button>
              <form className="credit-form" onSubmit={this.onTransfer}>
                <FormGroup>
                  <FormControl required={true}>
                    <InputLabel htmlFor="account" id="label">
                      Account Number From{" "}
                    </InputLabel>
                    <Input id="account1" name="account" />
                    <FormHelperText htmlFor="account1">
                      The account you wish to debit from
                    </FormHelperText>
                  </FormControl>

                  <FormControl required={true}>
                    <InputLabel htmlFor="account" id="label">
                      Account Number To
                    </InputLabel>
                    <Input id="account2" name="account" />
                    <FormHelperText htmlFor="account2">
                      The account you wish to credit
                    </FormHelperText>
                  </FormControl>

                  <FormControl required={true}>
                    <InputLabel htmlFor="amount" id="label">
                      Amount
                    </InputLabel>
                    <Input id="amount" />
                    <FormHelperText htmlFor="amount">
                      The amount you wish to credit
                    </FormHelperText>
                  </FormControl>
                </FormGroup>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btn"
                >
                  SUBMIT
                </Button>
              </form>
            </div>
            <div>
              Account Statement?
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={this.statementHandler}
                id="btn"
              >
                STATEMENT
              </Button>
              <form className="credit-form" onSubmit={this.onStatement}>
                <FormGroup style={{ marginLeft: "200px" }}>
                  <FormControl required={true}>
                    <InputLabel htmlFor="account" id="label">
                      Account Number
                    </InputLabel>
                    <Input id="account" name="account" />
                    <FormHelperText htmlFor="account">
                      The account you wish to get statement from
                    </FormHelperText>
                  </FormControl>
                </FormGroup>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btn"
                  style={{ marginLeft: "200px" }}
                >
                  SUBMIT
                </Button>
              </form>
            </div>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={this.state.showMessage}
            onClose={this.handleClose}
            autoHideDuration={6000}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id"> {this.state.successMessage}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
      </div>
    );
  }
}
export default Accounts;
