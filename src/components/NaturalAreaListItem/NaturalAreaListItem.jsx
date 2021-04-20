import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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

    console.log('pos', pos, 'of:', row.result.id);

    const displayCell = () => {
        if( userHunts[pos] !== undefined ) {
            console.log( userHunts[pos].displayed  )
        }
        let display = <TableCell align="right" onClick={() => addToHunts()}>Add</TableCell>
        if( userHunts[pos] !== undefined ) {
            if( userHunts[pos].displayed ) {
                display = <TableCell align="right" onClick={() => removeFromHunts()}>Remove</TableCell>
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

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {row.result.name}
                </TableCell>
                <TableCell align="right">{row.result.county}</TableCell>
                {displayCell()}
            </TableRow>
        </>
    )
}

export default NaturalAreaListItem
