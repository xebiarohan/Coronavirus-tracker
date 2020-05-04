import React, { Component } from "react";
import classes from "./App.module.css";
import DataTableView from "./containers/DataTableview/DataTableView";
import TotalCases from "./containers/TotalCases/TotalCases";
import NewCases from "./containers/NewCases/NewCases";
import { BrowserRouter, Route, Link } from "react-router-dom";
import DataGraphView from "./containers/DataGraphView/DataGraphView";
import TotatlCasesContext from "./context/TotalCasesContext";
import axios from "axios";
import { Button } from "@material-ui/core";
import GithubLogo from './assets/githhub_logo.png';
import linkedIn from './assets/linkedIn.png';

class App extends Component {
  state = {
    totalCases: 0,
    countryWiseData: [],
  };

  static contextType = TotatlCasesContext;

  componentDidMount() {
    axios.get("/virusData/activeCases").then((response) => {
      this.setState({ totalCases: response.data });
    });

    axios.get("/virusData/trackerData").then((response) => {
      this.setState({
        ...this.state,
        countryWiseData: response.data,
      });
    });
  }

  render() {
    console.log(this.state.totalCases + "App");
    return (
      <TotatlCasesContext.Provider
        value={{
          totalCases: this.state.totalCases,
          countryWiseData: this.state.countryWiseData,
        }}
      >
        <BrowserRouter>
          <div>
            <h2>Corona Virus Tracker Application</h2>

            <div className={classes.container}>
              <div className={classes.totalCount}>
                <TotalCases totalCases={this.state.totalCases} />
              </div>
              <div className={classes.latestCount}>
                <NewCases />
              </div>
              <div className={classes.pageLinks}>
                <Link to="/" style={{ paddingLeft: "1rem" }}>
                  <Button size="small" variant="contained" color="primary">
                    Table view
                  </Button>
                </Link>
                <Link to="/graph" style={{ paddingLeft: "1rem" }}>
                  <Button size="small" variant="contained" color="primary">
                    Graph view
                  </Button>
                </Link>
              </div>
            </div>

            <Route
              path="/"
              exact
              render={() => <DataTableView className="classes.dataTable" />}
            ></Route>
            <Route path="/graph" exact render={() => <DataGraphView />}></Route>
            <div className={classes.footerLinks}>
              <a
                target="_blank"
                href="https://github.com/xebiarohan/Coronavirus-tracker"
              >
                <img
                  alt="Github"
                  src={GithubLogo}
                  width="40"
                  height="80"
                />
              </a>
              <a className={classes.linkedInLogo}
                target="_blank"
                href="https://www.linkedin.com/in/rohan-aggarwal-585707145/"
              >
                <img
                  alt="LinkedIn"
                  src={linkedIn}
                  width="40"
                  height="55"
                />
              </a>
            </div>
          </div>
        </BrowserRouter>
      </TotatlCasesContext.Provider>
    );
  }
}

export default App;
