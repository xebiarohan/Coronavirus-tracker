import React, { useEffect, useState } from "react";
import CanvasJSReact from "./../../lib/canvasjs.react";
import axios from "axios";
import HighestCases from "./HighestCases/HighestCases";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DataGraphView = (props) => {
  const [countryWiseCount, setCountryWiseCount] = useState({
    virusData: [],
  });

  const [highestCases, setHighestCases] = useState([]);
  let dataPoints = [];
//   React.memo(() => {
    
//   },[countryWiseCount]);

 

  useEffect(() => {
    axios.get("/virusData/trackerData").then((response) => {
      setCountryWiseCount({
        virusData: response.data,
      });
    });

    if (countryWiseCount.virusData.length) {
        const countriesWithHightestCases = countryWiseCount.virusData
          .sort((a, b) => {
            if (a > b) {
              return 1;
            } else if (b > a) {
              return -1;
            } else {
              return 0;
            }
          })
          .slice(0, 10);
        
        countriesWithHightestCases.forEach((country) => {
          dataPoints.push({ x: country.country, y: country.latestTotal });
        });
        setHighestCases(dataPoints);
        // options.data[0].dataPoints = dataPoints;
      }
  }, [countryWiseCount.virusData,dataPoints]);

  return (
    <div>
      <HighestCases highestCases={highestCases}></HighestCases>
    </div>
  );
};

export default DataGraphView;
