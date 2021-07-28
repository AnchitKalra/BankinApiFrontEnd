import React, { Component } from "react";
import "./Header.css";
import "./star.png";
class Header extends Component {
  imageClickHandler = () => {
    this.props.history.push({
      pathname: "/",
    });
  };
  render() {
    return (
      <div className="main-component">
        <span>
          <img
            src="./star.png"
            height="50px"
            width="50px"
            onClick={this.imageClickHandler}
          ></img>
        </span>
        <span id="content">{this.props.heading}</span>
      </div>
    );
  }
}
export default Header;
