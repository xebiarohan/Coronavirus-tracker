import React, { useEffect } from 'react';
import axios from 'axios';

const TotalCases = (props) => {

    useEffect(() => {
        axios.get("/activeCases").then(response => {
            console.log(response.body);
        })
    },[]);

    return (
        <p> Total Number of cases :</p>
    );

}

export default TotalCases;