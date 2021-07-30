import React, { Component } from "react";
import Header from "./Header";
import { Input } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { FormGroup } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      showMessage: false,
      successMessage: "",
    };
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ showMessage: false });
  };

  submitHandler = (e) => {
    let b = this;
    e.preventDefault();
    let that = this;
    let details = e.target;
    let xhr = new XMLHttpRequest();
    let enc = details.number.value + ":" + details.password.value;
    let encode = window.btoa(enc);
    console.log(encode);
    let authorization = "Basic " + encode;
    console.log(authorization);
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        sessionStorage.clear();
        let a = JSON.parse(this.response);
        if (a.status === 500) {
          that.setState({
            showMessage: true,
            successMessage: "Please enter correct info",
          });
        } else {
          sessionStorage.setItem(
            "access-token",
            this.getResponseHeader("access-token")
          );

          // that.props.history.push({
          //   pathname: "/welcome",
          //   response: a.id,io
          // });

          b.props.history.push({
            pathname: "/accounts",
          });
        }
      }
    });
    xhr.open("POST", this.props.baseUrl + "login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("authorization", authorization);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
  };

  render() {
    return (
      <div>
        <Header heading="TRIPTI BANK LOGIN PAGE" history={this.props.history} />
        <div className="form">
          <form onSubmit={this.submitHandler}>
            <FormGroup>
              <FormControl className="formcontrol" required={true}>
                <InputLabel htmlFor="number">Contact Number</InputLabel>
                <Input id="number" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">
                  We'll never share your number.
                </FormHelperText>
              </FormControl>

              <FormControl className="formcontrol" required={true}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  aria-describedby="my-helper-text"
                  type="password"
                />
                <FormHelperText id="my-helper-text">
                  Please fill the password
                </FormHelperText>
              </FormControl>
              <FormControl className="formcontrol">
                <Button variant="contained" color="primary" type="submit">
                  SUBMIT
                </Button>
              </FormControl>
            </FormGroup>
          </form>
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
export default LoginPage;
