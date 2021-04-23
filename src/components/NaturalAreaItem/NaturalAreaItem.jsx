import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import MapContainer from '../MapContainer/MapContainer';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NaturalAreaItemSpeciesList from '../NaturalAreaItemSpeciesList/NaturalAreaItemSpeciesList';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const NaturalAreaItem = () => {
    const classes = useStyles();

    useEffect(() => { dispatch({type: 'FETCH_NATURAL_AREA', payload: id.id}) }, []);

    const dispatch = useDispatch();

    const id = useParams();

    const sna = useSelector( store => store.naturalArea);

    return (
        <div>
            <h1>{!Array.isArray(sna) ? sna.result.name : ''}</h1>
            {/* <Map /> */}
            { !Array.isArray(sna) ? <MapContainer lat={sna.result.parking[0].point.["epsg:4326"][1]} lng={sna.result.parking[0].point.["epsg:4326"][0]}/> : '' }
            {/* <Map lat={sna.result.parking[0].point.["epsg:4326"][1]} long={sna.result.parking[0].point.["epsg:4326"][0]}/> */}
            {/* { JSON.stringify(sna.result.parking[0].point.["epsg:4326"][1]) : ''} */}
            {/* {JSON.stringify(sna.result.species)} */}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Common Name</TableCell>
                        <TableCell align="right">Type of Plant</TableCell>
                        <TableCell align="right">Details</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {!Array.isArray(sna) ?
                    sna.result.species.tree_shrub.map((row, index) => <NaturalAreaItemSpeciesList row={row} index={index} type={'Tree'}/>)
                    : '' }
                    {!Array.isArray(sna) ?
                    sna.result.species.grass_sedge.map((row, index) => <NaturalAreaItemSpeciesList row={row} index={index} type={'Grass'}/>)
                    : '' }
                    {!Array.isArray(sna) ?
                    sna.result.species.wildflower.map((row, index) => <NaturalAreaItemSpeciesList row={row} index={index} type={'Wildflower'}/>)
                    : '' }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default NaturalAreaItem

