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
    // useEffect(() => {
    //     getNaturalAreas()
    // }, []);
    useEffect(() => {
        getNaturalAreas();
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
    const [search, setSearch] = useState({});

    // this is the local state for the list of sna objects that matched the search
    const [filtered, setFiltered] = useState([]);

    // this stores whether or not a search has happened 
    const [searched, setSearched] = useState(false);

    // handles search f
    const searchForNaturalArea = () => {
        console.log( 'in searchForNaturalArea' );
        // create a regex pattern that looks at each letter of the search query
        let pattern = search.split('').map( x => {
            return `(${x})`
        }).join('');
        // creates a regex based on the search pattern and looks globally and is case insensitive
        let regex = new RegExp(`${pattern}`, "gi");
        console.log(regex);
        // sets the filtered array equal to the sna's that match the query
        setFiltered(naturalAreas.filter( area => (area.result.county + ' ' + area.result.name).split('').join('').match(regex)))
        console.log(filtered);
        // set the search state to the opposite of what it was
        setSearched(!searched);
    }

    // only pings the api's one time on original page load
    const getNaturalAreas = () => {
        console.log( 'in getNaturalAreas' );
        let mounted = false;
        if( naturalAreas.length ) {
            mounted = true;
        }
        if( !mounted ) {
            dispatch({ type: 'FETCH_NATURAL_AREAS' });
        }
    }

    // conditionally renders the list of all natural areas or the filtered natural areas
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
