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
import './FloraListItem.css';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const FloraListItem = ({row, index}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSNA, setOpenSNA] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    let floraImage = [];
    floraImage = useSelector( store => store.trefleApis);

    const handleOpen = () => {
        
        dispatch({type: 'GET_FLORA_IMAGE', payload: row.sname});
        setOpen(true);
    };

    const handleOpenSNA = () => {
        setOpenSNA(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch({type: 'CLEAR_FLORA'})
    };

    const handleCloseSNA = () => {
        setOpenSNA(false);
    };

    const displayImage = () => {
        let display = ''
        if( !Array.isArray(floraImage) ) {
            if( floraImage.data.find( x => x.image_url !== null) !== undefined ) {
                display = <img src={floraImage.data.find( x => x.image_url !== null).image_url}/>
            }
            else {
                display = <p>No Image Available</p>
            }
        } else {
            display = <p>Loading...</p>
        }
        return display
    }

    const individualPage = (id) => {
        // dispatch({type: 'FETCH_NATURAL_AREA', payload: row.result.id});
        history.push(`/natural-area/${id}`, {params: id})
    }

    const body = (
        <div className={classes.paper, 'modal-size'}>
        <h2 id="simple-modal-title">{row.cname}</h2>
        <h2>{row.sname}</h2>
        {displayImage()}
        </div>

    );


    const bodyList = (
        <TableContainer className={classes.paper, 'modal-size', 'table'} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Natural Areas</TableCell>
                    <TableCell align="right">County</TableCell>
                    <TableCell align="right">Add to Hunts</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {row.id !== undefined ? row.id.map( x => 
                    <TableRow>
                        <TableCell onClick={() => individualPage(x.id)}>{x.name}</TableCell>
                        <TableCell>{x.county}</TableCell>
                        <TableCell>Add</TableCell>
                    </TableRow>
                    ) : '' }               
                </TableBody>
            </Table>
        </TableContainer>
        
    );

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row" onClick={handleOpen}>
                    {row.cname}
                </TableCell>
                <TableCell align="right">{row.species}</TableCell>
                <TableCell align="right" onClick={handleOpenSNA}>Natural Areas</TableCell>
            </TableRow>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {body}
            </Modal>
            <Modal
                open={openSNA}
                onClose={handleCloseSNA}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {bodyList}
            </Modal>
        </>
    )
}

export default FloraListItem
