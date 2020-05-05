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
import GithubLogo from "./assets/githhub_logo.png";
import linkedIn from "./assets/linkedIn.png";
import GoogleLogin from "react-google-login";
import DefaultProfile from "./assets/profile_default.png";

class App extends Component {
  state = {
    totalCases: 0,
    countryWiseData: [],
    userDetails: {
      userName: "",
      imageUrl: null,
    },
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

  login =
    this.state.userDetails.imageUrl !== null ? (
      <div className={classes.userContainer}>
        <div className={classes.userNameContainer}>
          Welcome{" "}
          {this.state.userDetails.userName !== ""
            ? this.state.userDetails.userName
            : "Guest"}
        </div>

        <img
          style={{ borderRadius: "50%", paddingTop: "0.4rem" }}
          alt="Profile pic"
          src={
            this.state.userDetails.imageUrl !== null
              ? this.state.userDetails.imageUrl
              : DefaultProfile
          }
          width="25"
          height="40"
        />
      </div>
    ) : (
      <div className={classes.googleLoginContainer}>
        <GoogleLogin
          clientId="1057494228025-qi8pi9mq2jj06sqo0ihb46eqrlv67lde.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );

  responseGoogle = (response) => {
    this.setState({
      ...this.state,
      userDetails: {
        userName: response.profileObj.name,
        imageUrl: response.profileObj.imageUrl,
      },
    });

    console.log(this.state);
  };

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
            <div className={classes.header}>
              <h2 className={classes.nameContainer}>
                Corona Virus Tracker Application
              </h2>
              {this.login}
            </div>

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
                <img alt="Github" src={GithubLogo} width="40" height="80" />
              </a>
              <a
                className={classes.linkedInLogo}
                target="_blank"
                href="https://www.linkedin.com/in/rohan-aggarwal-585707145/"
              >
                <img alt="LinkedIn" src={linkedIn} width="40" height="55" />
              </a>
            </div>
          </div>
        </BrowserRouter>
      </TotatlCasesContext.Provider>
    );
  }
}

export default App;
