import React, { Component } from "react";
import "./App.css";
import axios from 'axios';
import DataTableView from "./DataTableview/DataTableView";
import Country from "./Country/Country";


class App extends Component {

  state = {
    cases: []
  }

  render() {

    return (
      <div className="App">
        <h2>Corona Virus Tracker Application</h2>

        <DataTableView/>



      </div>
    );
  }
}

export default App;
