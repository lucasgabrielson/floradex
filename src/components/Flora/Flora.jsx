import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Toolbar,
    TextField
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NaturalAreaList from '../NaturalAreaList/NaturalAreaList';
import FloraList from '../FloraList/FloraList';

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

const Flora = () => {
    const classes = useStyles();

    useEffect(() => { dispatch({ type: 'PROCESS_NATURAL_AREAS'}) }, []);

    const dispatch = useDispatch();

    // this is the local state for the value of the search bar
    const [search, setSearch] = useState({});

    // this is the local state for the list of sna objects that matched the search
    const [filtered, setFiltered] = useState([]);

    // this stores whether or not a search has happened 
    const [searched, setSearched] = useState(false);

    const floraByNaturalArea = useSelector( store => store.naturalAreas);

    

    // handles search function
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
        setFiltered(floraByNaturalArea.filter( area => (area.result.county + ' ' + area.result.name).split('').join('').match(regex)))
        console.log(filtered);
        // set the search state to the opposite of what it was
        setSearched(!searched);
    }   
    
    const flora = () => {
        console.log( 'in flora' );
        
    }
    return (
        <div>
            <h1>Flora</h1>
            <div className ={classes.searchContainer}>
                <Toolbar>
                    <div className ={classes.searchContainer}>
                        <SearchIcon onClick={() => searchForNaturalArea()} className={classes.searchIcon}/>
                        <TextField onChange={e => setSearch(e.target.value)} />
                    </div>
                </Toolbar>
                {/* {JSON.stringify(naturalAreas.map( x => x.result.species.tree_shrub))} */}
                {/* {JSON.stringify(flora())} */}      
            </div>
            {floraByNaturalArea.length ? <FloraList total={floraByNaturalArea}/> : ''}  

        </div>
    )
}

export default Flora
