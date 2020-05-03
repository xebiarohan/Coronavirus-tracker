import React from "react";

const TotalCases = (props) => {
  
  return (
      <div>
        <div style={{ fontSize: "3rem", paddingBottom: "1rem" }}>
          {props.totalCases}
        </div>
        <div style={{ fontSize: "1.7rem", paddingBottom: "1rem" }}>
          Total cases reported as of today{" "}
        </div>
      </div>
  );
};

export default TotalCases;
