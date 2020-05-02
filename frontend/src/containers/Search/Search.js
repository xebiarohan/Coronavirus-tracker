import React, { useState, useEffect } from "react";
import classes from "./Search.module.scss";
import useDebounce from "../../utility/UseDebouncing/UseDebounce";

const Search = (props) => {
  const [searchText, setSearchText] = useState("");
  //const debouncedSearchTerm = useDebounce(searchText, 1000);

  //   useEffect(() => {
  //       console.log("here");
  //     if(debouncedSearchTerm) {
  //         clickFunction(searchText);
  //       }
  //   },[debouncedSearchTerm,clickFunction])

  //   const searchTextHandler = (event) => {
  //     setSearchText(event.target.value);
  //     // if (debouncedFn === null) {
  //     //   debouncedFn = debounce(() => {
  //     //     console.log(searchText);
  //     //     props.click(searchText);
  //     //   }, 1000);

  //     //   debouncedFn();
  //     // }
  //   };

  return (
    <div className={classes.searchContainer}>
      <span>Search :</span>
      <input
        type="text"
        value={searchText}
        onChange={(event) => {
          event.persist();
          setSearchText(event.target.value);
          console.log(event.target.value);
          props.click(event.target.value);
        }}
      />
    </div>
  );
};

export default Search;
