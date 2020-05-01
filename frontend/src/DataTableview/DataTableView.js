import React, { useEffect, useState, useMemo } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import useSortableData from "./DataSort";

const DataTableView = (props) => {
  const [countryWiseCount, setCountryWiseCount] = useState({
    virusData: [],
  });

  const { items, requestSort } = useSortableData(countryWiseCount.virusData);



  useEffect(() => {
    axios.get("/trackerData").then((response) => {
      setCountryWiseCount({
        virusData: response.data,
      });
    });
  }, []);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  const headers = (
    <TableRow>
      <StyledTableCell
        onClick={() => {
          requestSort("country");
        }}
      >
        Country
      </StyledTableCell>
      <StyledTableCell>State</StyledTableCell>
      <StyledTableCell>Active cases</StyledTableCell>
      <StyledTableCell>Difference From Previous Day</StyledTableCell>
      <StyledTableCell>New Deaths</StyledTableCell>
      <StyledTableCell>Total Deaths</StyledTableCell>
    </TableRow>
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>{headers}</TableHead>
          <TableBody>
            {items.map((country, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{country.country}</StyledTableCell>
                <StyledTableCell>
                  {country.state !== "" ? country.state : "-"}
                </StyledTableCell>
                <StyledTableCell>{country.latestTotal}</StyledTableCell>
                <StyledTableCell>{country.diffFromPreviousDay}</StyledTableCell>
                <StyledTableCell>{country.newDeaths}</StyledTableCell>
                <StyledTableCell>{country.totalDeath}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTableView;
