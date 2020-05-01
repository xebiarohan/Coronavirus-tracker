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

  return <p> Total Number of cases : {totalCases}</p>;
};

export default TotalCases;
