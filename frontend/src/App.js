import React, { Component } from "react";
import "./App.css";
import axios from 'axios';
import Country from './Country/Country';

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
    const countryData = this.state.cases.map( (country,index) => {
      return <Country key= {index}
                countryName={country.country} 
                latestTotal= {country.latestTotal}
                stateName ={country.state}
                diffFromPreviousDay = {country.diffFromPreviousDay}/>
    })

    return (
      <div className="App">
        <h2>Corona Virus Tracker Application</h2>

        {countryData}
      </div>
    );
  }
}

export default App;
