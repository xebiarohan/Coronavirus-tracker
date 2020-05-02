import React, { useState } from "react";
import classes from "./Search.module.scss";

const Search = (props) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className={classes.searchContainer}>
      <span>Search :</span>
      <input
        type="text"
        value={searchText}
        onChange={(event) => {
          event.persist();
          setSearchText(event.target.value);
          props.click(event.target.value);
        }}
      />
    </div>
  );
};

export default Search;
