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
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
        searchContainer: {
            display: 'flex',
            
        },
        searchIcon: {

        }
}));

const NaturalAreas = () => {
    // On component mount make all of the api calls to return the sna objects from the DNR 
    // useEffect(() => {
    //     getNaturalAreas()
    // }, []);
    useEffect(() => {
        // getNaturalAreas();
        // window.addEventListener("beforeunload", alertUser);
        // return () => {
        //   window.removeEventListener("beforeunload", alertUser);
        // };
    }, []);
    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };
    
    // bring in the dnrApis from redux -- this is currently unncessary because I have the information hard
    // wired in the router
    // const dnrApis = useSelector((store) => store.dnrApis);

    const classes = useStyles();

    const dispatch = useDispatch();

    // bring in all of the sna objects that were fetched from the api
    const naturalAreas = useSelector((store) => store.naturalAreas);

    // this is the local state for the value of the search bar
    let search = '';

    // this is the local state for the list of sna objects that matched the search
    const [filtered, setFiltered] = useState([]);

    // this stores whether or not a search has happened 
    const [searched, setSearched] = useState(false);

    // conditionally renders the list of all natural areas or the filtered natural areas
    const displayList = () => {
        let display = <NaturalAreaList naturalAreas={naturalAreas} />
        if( searched ) {
            display = <NaturalAreaList naturalAreas={filtered} />
        }
        return display;
    }

    // handles search f
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
            setFiltered(naturalAreas.filter( area => (area.result.county + ' ' + area.result.name).match(regex)))
            console.log(filtered);
            // set the search state to the opposite of what it was
            setSearched(true);
        } else {
            setSearched(false);
        }
        
    }

    return (
        <div>
            <br />
            <br />
            <h1>Natural Areas</h1>
            <Toolbar>
                <div className ={classes.searchContainer}>
                    <SearchIcon className={classes.searchIcon}/>
                    <TextField onChange={e => searchForNaturalArea(e)} />
                </div>
            </Toolbar>
            {naturalAreas.length && displayList()}

        </div>
    )
}

export default NaturalAreas
