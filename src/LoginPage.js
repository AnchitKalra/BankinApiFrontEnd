import React, { Component } from "react";
import Header from "./Header";
import { Input } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { FormGroup } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Button } from "@material-ui/core";

class LoginPage extends Component {
  submitHandler = (e) => {
    let b = this;
    e.preventDefault();
    let details = e.target;
    let xhr = new XMLHttpRequest();
    let enc = details.number.value + ":" + details.password.value;
    let encode = window.btoa(enc);
    console.log(encode);
    let authorization = "Basic " + encode;
    console.log(authorization);
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        //console.log(this.response);
        let a = JSON.parse(this.response);
        console.log(this.getResponseHeader("access-token"));
        sessionStorage.setItem(
          "access-token",
          this.getResponseHeader("access-token")
        );
        // that.props.history.push({
        //   pathname: "/welcome",
        //   response: a.id,io
        // });
        console.log(a);
        b.props.history.push({
          pathname: "/accounts",
        });
      }
    });
    xhr.open("POST", "http://localhost:8080/api/login");
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
                  Please Fill a strong password
                </FormHelperText>
              </FormControl>
              <FormControl className="formcontrol">
                <Button variant="contained" color="primary" type="submit">
                  SUBMIT
                </Button>
              </FormControl>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}
export default LoginPage;
