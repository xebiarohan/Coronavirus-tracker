import React, { useContext } from "react";
import CanvasJSReact from "./../../../lib/canvasjs.react";
import TotalCasesContext from "./../../../context/TotalCasesContext";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DataPieChart = (props) => {
  const context = useContext(TotalCasesContext);
  const currentCountryWiseData = context.countryWiseData;

  //   currentCountryWiseData.forEach((country) => {
  //     country.percentage = country.latestTotal / context.totalCases;
  //     country.label = country.country;
  //   });
  let updatedResult = [];

  currentCountryWiseData.forEach((country) => {
    updatedResult.push({
      y: +(((+country.latestTotal /+context.totalCases)*100).toFixed(2)),
      label: country.country,
    });
  });

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
      text: "Pie chart",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: updatedResult,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default DataPieChart;
