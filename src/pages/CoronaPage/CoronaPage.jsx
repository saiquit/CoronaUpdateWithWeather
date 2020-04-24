import React, { Component } from "react";
import Card from "../../components/card/Card";
import axios from "axios";

class CoronaPage extends Component {
  state = {
    global: undefined,
    countries: undefined,
    date: undefined,
  };

  async componentDidMount() {
    await axios.get(`https://api.covid19api.com/summary`).then((res) => {
      let currentData = res.data;
      this.setState({
        global: currentData.Global,
        countries: currentData.Countries,
        date: currentData.Date,
      });
    });
  }
  render() {
    return (
      <div>
        <div className="global_card">
          {this.state.global !== undefined ? (
            <Card props={this.state} />
          ) : (
            <p>Loading</p>
          )}
        </div>
        <h2>Main</h2>
      </div>
    );
  }
}

export default CoronaPage;
