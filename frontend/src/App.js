import React, { Component } from "react";
import classes from "./App.module.css";
import DataTableView from "./containers/DataTableview/DataTableView";
import TotalCases from "./containers/TotalCases/TotalCases";
import NewCases from "./containers/NewCases/NewCases";
import { BrowserRouter,Route,Link } from "react-router-dom";
import DataGraphView from "./containers/DataGraphView/DataGraphView";

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
            <div className={classes.pageLinks}>
                <Link to="/">Table View</Link>
                <Link to="/graph">Graph View</Link>
            </div>
          </div>

        <Route path="/" exact render = {() =><DataTableView className="classes.dataTable" />}></Route>
          {/* <DataTableView className="classes.dataTable" /> */}
        <Route path="/graph" exact render = {() => <DataGraphView/>}></Route>  
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
