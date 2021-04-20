import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Toolbar,
    TextField
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NaturalAreaList from '../NaturalAreaList/NaturalAreaList'

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

        }
}));

const NaturalAreas = () => {
    // On component mount make all of the api calls to return the sna objects from the DNR 
    useEffect(() => {
        getNaturalAreas()
    }, []);
    
    // bring in the dnrApis from redux -- this is currently unncessary because I have the information hard
    // wired in the router
    const dnrApis = useSelector((store) => store.dnrApis);

    const classes = useStyles();

    const dispatch = useDispatch();

    // bring in all of the sna objects that were fetched from the api
    const naturalAreas = useSelector((store) => store.naturalAreas);

    // this is the local state for the value of the search bar
    const [search, setSearch] = useState({});

    // this is the local state 
    const [filtered, setFiltered] = useState([]);

    const [searched, setSearched] = useState(false);

    const searchForNaturalArea = () => {
        console.log( 'in searchForNaturalArea' );
        let pattern = search.split('').map( x => {
            return `(?=.*${x})`
        }).join('');
        let regex = new RegExp(`${pattern}`, "gi");
        console.log(regex);
        setFiltered(naturalAreas.filter( area => (area.result.county + ' ' + area.result.name).split('').join('').match(regex)))
        console.log(filtered);
        setSearched(!searched);
    }

    const getNaturalAreas = () => {
        let mounted = false;
        if( naturalAreas.length ) {
            mounted = true
        }
        if( !mounted ) {
            dispatch({ type: 'FETCH_NATURAL_AREAS' });
        }
    }

    const displayList = () => {
        let display = <NaturalAreaList naturalAreas={naturalAreas} />
        if( searched ) {
            display = <NaturalAreaList naturalAreas={filtered} />
        }
        return display;
    }

    return (
        <div>
            <h1>Natural Areas</h1>
            <Toolbar>
                <div className ={classes.searchContainer}>
                    <SearchIcon onClick={() => searchForNaturalArea()} className={classes.searchIcon}/>
                    <TextField onChange={e => setSearch(e.target.value)} />
                </div>
            </Toolbar>
            {displayList()}

        </div>
    )
}

export default NaturalAreas
