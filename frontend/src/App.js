import React, { Component } from "react";
import classes from "./App.module.css";
import DataTableView from "./DataTableview/DataTableView";
import TotalCases from "./TotalCases/TotalCases";
import NewCases from "./NewCases/NewCases";

class App extends Component {
  state = {
    cases: [],
  };

  render() {
    return (
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
    );
  }
}

export default App;
