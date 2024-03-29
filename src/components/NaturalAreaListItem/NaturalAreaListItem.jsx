import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {FaPlusCircle} from 'react-icons/fa';
import {FaTimesCircle} from 'react-icons/fa';

const NaturalAreaListItem = ({row, index}) => {
    useEffect(() => {
        dispatch({ type: 'GET_MY_HUNTS', payload: user.id }); 
    }, []);

    const [added, setAdded] = useState( false );

    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    const userHunts = useSelector( store => store.userHunts);

    const pos = userHunts.map(function(e) { return e.natural_area_id; }).indexOf('http://services.dnr.state.mn.us/api/sna/detail/v1?id=' + row.result.id);

    let displayed = false; 

    // console.log('pos', pos, 'of:', row.result.id);

    const history = useHistory();

    const displayCell = () => {
        if( userHunts[pos] !== undefined ) {
            console.log( userHunts[pos].displayed  )
        }
        let display = <TableCell align="right" onClick={() => addToHunts()}><FaPlusCircle /></TableCell>
        if( userHunts[pos] !== undefined ) {
            if( userHunts[pos].displayed ) {
                display = <TableCell align="right" onClick={() => removeFromHunts()}><FaTimesCircle /></TableCell>
            }
        }
        return display;
    }

    let objectToSend = {
        id: user.id,
        endpoint: row.result.id,
        displayed: displayed
    }

    const addToHunts = () => {
        if( pos === -1 ) {
            dispatch({ type: 'ADD_TO_HUNTS', payload: objectToSend });
        } else {
            objectToSend = {
                id: user.id,
                endpoint: row.result.id,
                displayed: true
            }
            dispatch({ type: 'UPDATE_HUNTS', payload: objectToSend });
        }
        
    }

    const removeFromHunts = () => {
        dispatch({ type: 'UPDATE_HUNTS', payload: objectToSend })
    }

    const individualPage = () => {
        // dispatch({type: 'FETCH_NATURAL_AREA', payload: row.result.id});
        history.push(`/natural-area/${row.result.id}`, {params: row.result.id})
    }

    return (
        <>
            <TableRow key={index}>
                {/* <Link to={`/natural-area/${row.result.id}`} params={row.result.id}> */}
                <TableCell component="th" scope="row" onClick={() => individualPage()}>
                    {row.result.name}
                </TableCell>
                <TableCell align="right">{row.result.county}</TableCell>
                {/* </Link> */}
                {displayCell()}
            </TableRow>
        </>
    )
}

export default NaturalAreaListItem
