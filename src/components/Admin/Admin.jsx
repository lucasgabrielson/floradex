import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AdminItem from '../AdminItem/AdminItem';

const Admin = () => {
    const dispatch = useDispatch()
    useEffect(() => { dispatch({type: 'GET_ADMIN' })}, []);
    const admin = useSelector( store => store.admin);
    return (
        <div>
            <h1>Admin</h1>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Common Name</TableCell>
                        <TableCell>Scientific Name</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Natural Area</TableCell>
                        <TableCell align="right">Image</TableCell>
                        <TableCell>Substantiate</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {admin !== [] && admin.map( (row, index) => <AdminItem row={row} index={index}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Admin
