import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import {useParams} from 'react-router-dom';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 350,
    },
}));


const MyHunts = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => { dispatch({type: 'GET_MY_HUNTS', payload: id.id}) }, []);

    const id = useParams();

    const user = useSelector((store) => store.user);

    const myHunts = useSelector( store => store.userHunts);

    const naturalAreas = useSelector( store => store.naturalAreas );

    const [filtered, setFiltered] = useState([]);

    const [fetched, setFetched] = useState(false);
    const hunts = myHunts.filter( row => row.displayed);
    let found = [];
    const fetchTableData = () => {
        
        for( let i = 0; i < hunts.length; i++) {
            found = [...found, naturalAreas.find( row => row.result.id === hunts[i].natural_area_id.slice(53))];
        }
        // if(!fetched) {
        //     console.log( 'in displayTable');
        //     console.log('this is hunts:', hunts );
        //     // hunts.map( row => dispatch({type: 'FETCH_MY_HUNT_ITEMS', payload: row.natural_area_id.slice(53)}))
        //     setFetched(!fetched);
        // }
        console.log('this is found', found)

    }

    const myHuntItems = useSelector( store => store.userHuntItems);

    const history = useHistory();
    const individualPage = (id) => {
        history.push(`/my-hunts-item/${id}`, {params: id})
    }

    const removeFromHunts = (endpoint) => {
        const objectToSend = {
        id: user.id,
        endpoint: endpoint,
        displayed: false
        }
        swal({
            title: 'Are you sure you want to remove this hunt?',
            // text: '. . . forever?',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then( willDelete => {
            if( willDelete ) {
                swal( 'Removed!', {
                    icon: 'success',
                });
                dispatch({ type: 'UPDATE_HUNTS', payload: objectToSend })
            } else {
                swal( 'Removal Cancelled' );
            }});
        
    }

    return (
        <>
            <br/>
            <br/>
            <h1>My Hunts</h1>
            {fetchTableData()}
            <TableContainer className={classes.paper} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Natural Areas</TableCell>
                        <TableCell align="right">County</TableCell>
                        <TableCell align="right">Remove</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {hunts.length > 0 && found.map( x => 
                        <TableRow>
                            <TableCell onClick={() => individualPage(x.result.id)}>{x.result.name}</TableCell>
                            <TableCell>{x.result.county}</TableCell>
                            <TableCell onClick={() => removeFromHunts(x.result.id)}>X</TableCell>
                        </TableRow>
                        )}               
                    </TableBody>
                </Table>
            </TableContainer>
            {/* {naturalAreas !== undefined ? JSON.stringify(naturalAreas[0].result.id) : ''} */}
            {/* {myHunts !== undefined ? JSON.stringify(hunts) : ''} */}
            {/* {hunts.length ? JSON.stringify(found[1].result.name) : ''} */}
        </>
    )
}

export default MyHunts

