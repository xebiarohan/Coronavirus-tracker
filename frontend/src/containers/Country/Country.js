import React from 'react';

const Country = (props) => {
    return (
    <p>{props.countryName} {props.stateName} - {props.latestTotal} {props.diffFromPreviousDay}</p>
    );
}

export default Country;