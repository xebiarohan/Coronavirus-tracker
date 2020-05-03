import React, { useEffect, useState } from "react";
import axios from "axios";
import HighestCases from "./HighestCases/HighestCases";
import DataPieChart from "./DataPieChart/DataPieChart";
import classes from "./DataGraphView.module.scss";

const DataGraphView = (props) => {
  const [countryWiseCount, setCountryWiseCount] = useState({
    virusData: [],
  });

  const [highestCases, setHighestCases] = useState([]);

  React.useMemo(() => {
    let dataPoints = [];
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
        dataPoints.push({ label: country.country, y: country.latestTotal });
      });
      setHighestCases(dataPoints);
      // options.data[0].dataPoints = dataPoints;
    }
  }, [countryWiseCount.virusData]);

  useEffect(() => {
    axios.get("/virusData/trackerData").then((response) => {
      setCountryWiseCount({
        virusData: response.data,
      });
    });
  }, []);

  return (
    <div className={classes.graphContainer}>
      <div className={classes.pieChartContainer}>
        <DataPieChart></DataPieChart>
      </div>
      <div className={classes.barChartContainer}>
        <HighestCases highestCases={highestCases}></HighestCases>
      </div>
      
    </div>
  );
};

export default React.memo(DataGraphView);
