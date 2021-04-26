import React, {useEffect, useState} from 'react';
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
import {
    Toolbar,
    TextField
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NaturalAreaItemSpeciesList from '../NaturalAreaItemSpeciesList/NaturalAreaItemSpeciesList';

const useStyles = makeStyles( theme => ({
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    // textField: {
    //     marginLeft: theme.spacing(1),
    //     marginRight: theme.spacing(1),
    //     width: '25ch',
    // },
        searchContainer: {
            display: 'flex',
            
        },
        searchIcon: {

        },
        table: {
            minWidth: 650,
        },
}));

const NaturalAreaItem = () => {
    const classes = useStyles();

    useEffect(() => { dispatch({type: 'FETCH_NATURAL_AREA', payload: id.id}) }, []);

    const dispatch = useDispatch();

    const id = useParams();

    const sna = useSelector( store => store.naturalArea);

    let search = '';
    // this is the local state for the list of sna objects that matched the search
    const [filteredTree, setFilteredTree] = useState([]);
    const [filteredGrass, setFilteredGrass] = useState([]);
    const [filteredWildflower, setFilteredWildflower] = useState([]);

    // this stores whether or not a search has happened 
    const [searched, setSearched] = useState(false);

    const [flora, setFlora] = useState([]);

    const searchForNaturalArea = (e) => {
        search += e.target.value;
        console.log( 'search', search );
        // create a regex pattern that looks at each letter of the search query
        if( search.length > 0) {
            let pattern = search.split('').map( x => {
            return `(${x})`
            }).join('');
            // creates a regex based on the search pattern and looks globally and is case insensitive
            let regex = new RegExp(`${pattern}`, "gi");
            console.log(regex);
            // sets the filtered array equal to the sna's that match the query
            setFilteredTree(sna.result.species.tree_shrub.filter( row => (row.cname + ' ' + row.sname).split('').join('').match(regex)));
            setFilteredGrass(sna.result.species.grass_sedge.filter( row => (row.cname + ' ' + row.sname).split('').join('').match(regex)));
            setFilteredWildflower(sna.result.species.wildflower.filter( row => (row.cname + ' ' + row.sname).split('').join('').match(regex)));            
            // set the search state to the opposite of what it was
            setSearched(true);
        } else {
            setSearched(false);
        }
        
    } 

    return (
        <div>
            <h1>{!Array.isArray(sna) ? sna.result.name : ''}</h1>
            {/* <Map /> */}
            <Toolbar>
                <div className ={classes.searchContainer}>
                    <SearchIcon className={classes.searchIcon}/>
                    <TextField onChange={e => searchForNaturalArea(e)} />
                </div>
            </Toolbar>
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
                        {!Array.isArray(sna) && !searched ?
                        sna.result.species.tree_shrub.map((row, index) => <NaturalAreaItemSpeciesList row={row} index={index} type={'Tree'}/>)
                        : '' }
                        {!Array.isArray(sna) && !searched  ?
                        sna.result.species.grass_sedge.map((row, index) => <NaturalAreaItemSpeciesList row={row} index={index} type={'Grass'}/>)
                        : '' }
                        {!Array.isArray(sna) && !searched ?
                        sna.result.species.wildflower.map((row, index) => <NaturalAreaItemSpeciesList row={row} index={index} type={'Wildflower'}/>)
                        : '' }
                        {!Array.isArray(sna) && searched ?
                        filteredTree.map((row, index) => <NaturalAreaItemSpeciesList row={row} index={index} type={'Tree'}/>)
                        : '' }
                        {!Array.isArray(sna) && searched  ?
                        filteredGrass.map((row, index) => <NaturalAreaItemSpeciesList row={row} index={index} type={'Grass'}/>)
                        : '' }
                        {!Array.isArray(sna) && searched ?
                        filteredWildflower.map((row, index) => <NaturalAreaItemSpeciesList row={row} index={index} type={'Wildflower'}/>)
                        : '' }
                        
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default NaturalAreaItem

