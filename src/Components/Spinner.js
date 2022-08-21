import React, { Component } from "react";
import Loading from "../spinner.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center" style={{ zIndex: "5" }}>
        <img src={Loading} alt="loading" />
      </div>
    );
  }
}
