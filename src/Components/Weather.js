import React, { Component } from "react";

export default class Weather extends Component {
  constructor() {
    super();
    this.state({
      weatherImg: null,
      temperature: null,
      unit: null,
      location: null,
    });
  }

  render() {
    return <div></div>;
  }
}
