import React, { Component } from "react";
import classes from "./App.module.css";
import DataTableView from "./containers/DataTableview/DataTableView";
import TotalCases from "./containers/TotalCases/TotalCases";
import NewCases from "./containers/NewCases/NewCases";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  state = {
    cases: [],
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <h2>Corona Virus Tracker Application</h2>

          <div className={classes.container}>
            <div className={classes.totalCount}>
              <TotalCases />
            </div>
            <div className={classes.latestCount}>
              <NewCases />
            </div>
          </div>

          <DataTableView className="classes.dataTable" />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
