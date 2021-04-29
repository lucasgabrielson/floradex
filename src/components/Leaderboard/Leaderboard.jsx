import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LeaderboardItem from '../LeaderboardItem/LeaderboardItem';

const Leaderboard = () => {
    useEffect(() => { dispatch({type: 'GET_LEADERBOARD'}); dispatch({type: 'GET_TOTAL_USERS', payload: id.id})  }, []);

    const id = useParams();

    const dispatch = useDispatch();

    const leaderboard = useSelector( store => store.leaderboard);
    const totalUsers = useSelector( store => store.totalUsers);
    const user = useSelector( store => store.user)

    return (
        <div>
            <h1>Leaderboard</h1>
            {/* {JSON.stringify(id.id)} */}
            {totalUsers[0] !== undefined && JSON.stringify(leaderboard.map(function(e) { return e.user_id; }).indexOf(user.id) + 1 + '/' + totalUsers[0].count)}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Rank</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboard.map( (row, index) => <LeaderboardItem row={row} index={index}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Leaderboard

