import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";

import Pagination from '../../table-pagination/table-pagination'

// core components
import tableStyle from "../../../assets/jss/material-dashboard-react/components/tableStyle.jsx";
import { withRouter} from "react-router-dom"

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor, page, rowsPerPage, emptyRows } = props;
 
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}>
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData ? tableData.map((data, key) => {
            return (
              data ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prop, key) => {
                return (
                  <TableRow key={key}  >
                    { prop ? prop.map((pro, key) => {
                      return (
                        (typeof pro === 'string' && pro.search('href') !== -1) || (typeof pro === 'string' && pro.search('deleted') !== -1) ? 
                            <TableCell className={classes.tableCell} key={key}>
                              <div dangerouslySetInnerHTML={{ __html: pro }} />
                            </TableCell>
                          : 
                            <TableCell className={classes.tableCell} key={key}>
                                {pro}  
                            </TableCell>
                      );
                    }) : null}
                  </TableRow>
                );
              }) : null
            )}) : null}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
             )}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withRouter(withStyles(tableStyle)(CustomTable));
