import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const DataTableView = (props) => {
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
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell>State</StyledTableCell>
              <StyledTableCell>Active cases</StyledTableCell>
              <StyledTableCell>Difference From Previous Day</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.countryData.map((country, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {country.country}
                </StyledTableCell>
                <StyledTableCell>{country.state !== "" ? country.state : "-"}</StyledTableCell>
                <StyledTableCell>{country.latestTotal}</StyledTableCell>
                <StyledTableCell>{country.diffFromPreviousDay}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTableView;
