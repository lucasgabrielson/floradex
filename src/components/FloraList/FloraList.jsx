import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FloraListItem from '../FloraListItem/FloraListItem';
import TablePagination from '@material-ui/core/TablePagination';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const FloraList = ({total}) => {
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
                    <TableCell>Flora</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Natural Areas</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {total !== undefined ? total.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (<FloraListItem row={row} index={index}/>)) : ''}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={total.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </>
    );
}

export default React.memo(FloraList)
