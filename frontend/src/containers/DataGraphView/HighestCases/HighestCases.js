import React from 'react';
import CanvasJSReact from "./../../../lib/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const HighestCases = (props) => {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", //"light1", "dark1", "dark2"
      title: {
        text: "Top 10 countries with highest cases",
      },
      data: [
        {
          type: "column", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: props.highestCases,
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


export default HighestCases;