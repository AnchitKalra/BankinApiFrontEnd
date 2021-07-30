import React, { Component } from "react";
import Header from "./Header";
import "./Login.css";
import FormControl from "@material-ui/core/FormControl";
import { FormGroup, InputLabel } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { Button } from "@material-ui/core";

class Login extends Component {
  loginHandler = () => {
    this.props.history.push({ pathname: "/login" });
  };

  submitHandler = (e) => {
    let that = this;
    e.preventDefault();
    let details = e.target;
    let signupCustomerRequest = "";
    let xhr = new XMLHttpRequest();
    signupCustomerRequest = {
      contact_number: details.number.value,
      email_address: details.email.value,
      first_name: details.name.value,
      last_name: details.lastname.value,
      password: details.password.value,
    };
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        //console.log(this.response);
        let a = JSON.parse(this.response);
        that.props.history.push({
          pathname: "/welcome",
          response: a.id,
        });
      }
    });
    xhr.open("POST", this.props.baseUrl + "signup");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(JSON.stringify(signupCustomerRequest));
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
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">
                  We'll never share your email.
                </FormHelperText>
              </FormControl>

              <FormControl className="formcontrol" required={true}>
                <InputLabel htmlFor="name">First Name</InputLabel>
                <Input id="name" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">
                  We'll never share your name.
                </FormHelperText>
              </FormControl>

              <FormControl className="formcontrol" required={true}>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input id="lastname" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">
                  We'll never share your name.
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

              <FormControl>
                <Button
                  id="submitbtn"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  SUBMIT
                </Button>
              </FormControl>
            </FormGroup>
          </form>
        </div>
        <div className="login-container">
          Already have an account?
          <br />
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
export default Login;
