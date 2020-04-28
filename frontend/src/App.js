import React, { Component } from "react";
import "./App.css";
import axios from 'axios';
import DataTableView from "./DataTableview/DataTableView";
import Country from "./Country/Country";


class App extends Component {

  state = {
    cases: []
  }

  componentDidMount() {
      axios.get("/trackerData")
      .then(response => {
        this.setState({
          cases: response.data
        })
        console.log(response);
      })
  }




  render() {

    return (
      <div className="App">
        <h2>Corona Virus Tracker Application</h2>

        <DataTableView countryData={this.state.cases}/>



      </div>
    );
  }
}

export default App;
