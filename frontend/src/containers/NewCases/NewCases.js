import React, { useState, useEffect } from "react";
import axios from "axios";

const NewCases = (props) => {
  const [latestCases, setlatestCases] = useState(0);

  useEffect(() => {
    axios.get("/virusData/newCases").then((response) => {
      setlatestCases(response.data);
    });
  }, []);

  return (
    <div>
      <div style={{ fontSize: "1.5rem", paddingBottom: "1rem" }}>
        {latestCases}
      </div>
      <div style={{ fontSize: "1.1rem", paddingBottom: "1rem" }}>
      New cases reported as of last day
      </div>
    </div>
  );
};

export default NewCases;
