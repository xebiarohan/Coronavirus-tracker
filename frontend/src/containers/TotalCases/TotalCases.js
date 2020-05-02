import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalCases = (props) => {
  const [totalCases, setTotalCases] = useState(0);

  useEffect(() => {
    axios.get("/virusData/activeCases").then((response) => {
      console.log(response);
      setTotalCases(response.data);
    });
  }, []);

  return (
      <div>
          <div style= {{fontSize: "3rem",
                        paddingBottom: "1rem"}}>{totalCases}</div>
          <div style = {{fontSize: "1.7rem", paddingBottom: "1rem"}}>Total cases reported as of today </div> 
      </div>
  )
};

export default TotalCases;
