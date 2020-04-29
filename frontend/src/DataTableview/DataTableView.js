import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const DataTableView = (props) => {
  const [countryWiseCount, setCountryWiseCount] = useState({
    virusData: [],
  });

  const [sortedField, setSortedField] = useState();

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
  React.useMemo(() => {
    if (sortedField) {
      let currentData = [...countryWiseCount.virusData];
      console.log(new Date());
      currentData = currentData.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return -1;
        }
        if (a[sortedField] > b[sortedField]) {
          return 1;
        }
        return 0;
      });
      console.log(new Date());
      setCountryWiseCount({ virusData: currentData });
    }
  }, [sortedField]);

  const headers = (
    <TableRow>
      <StyledTableCell
        onClick={() => {
          setSortedField("country");
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
            {countryWiseCount.virusData.map((country, index) => (
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
