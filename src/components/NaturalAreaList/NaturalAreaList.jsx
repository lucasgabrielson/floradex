import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NaturalAreaListItem from '../NaturalAreaListItem/NaturalAreaListItem';
import TablePagination from '@material-ui/core/TablePagination';


const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});

const NaturalAreaList = ({naturalAreas}) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Natural Area</TableCell>
                    <TableCell align="right">County</TableCell>
                    <TableCell align="right">Add to Hunts</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {naturalAreas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <NaturalAreaListItem row={row} index={index}/>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={naturalAreas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </>
    );
}

export default NaturalAreaList






