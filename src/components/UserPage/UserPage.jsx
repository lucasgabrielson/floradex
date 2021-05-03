import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function UserPage() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const flora = useSelector( store => store.naturalAreasProcessing);



  return (
    <>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <header>
      </header>
      {/* <Link to = '/natural-areas'>
        <button>Find a Natural Area</button>
      </Link>
      <Link to = '/flora'>
        <button>Find a Plant</button>
      </Link>
      <Link to = {`/my-hunts/${user.id}`} params={user.id}>
        <button>My Hunts</button>
      </Link> */}

      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
            component="img"
            alt="FerryBluff"
            height="110"
            image="https://dnr.wi.gov/topic/lands/naturalareas/images/217_ferrybluff.jpg"
            title="FerryBluff"
          />
      </CardActionArea>
      <CardActions>
        <Link to = '/natural-areas' style={{ textDecoration: 'none', color: 'white' }}>
          <Button size="large" color="primary">
            Find a Natural Area
          </Button>        
        </Link>
      </CardActions>
    </Card>

    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
            component="img"
            alt="Pink LadySlipper"
            height="110"
            image="https://i.etsystatic.com/23628638/r/il/03ccd5/2419617859/il_1588xN.2419617859_3baj.jpg"
            title="LadySlipper"
          />
      </CardActionArea>
      <CardActions>
        <Link to = '/flora' style={{ textDecoration: 'none', color: 'white' }}>
          <Button size="large" color="primary">
            Find by Flora
          </Button> 
        </Link>
      </CardActions>
    </Card>

    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
            component="img"
            alt="My Hunts"
            height="110"
            image="https://i.ytimg.com/vi/qvbWrsev-Ak/maxresdefault.jpg"
            title="My Hunts"
          />
      </CardActionArea>
      <CardActions>
        <Link to = {`/my-hunts/${user.id}`} params={user.id} style={{ textDecoration: 'none', color: 'white' }}>
          <Button size="large" color="primary">
            My Hunts
          </Button> 
        </Link> 
      </CardActions>
    </Card>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
// });

// export default function ImgMediaCard() {
//   const classes = useStyles();

//   return (
//     <Card className={classes.root}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           alt="Contemplative Reptile"
//           height="140"
//           image="/static/images/cards/contemplative-reptile.jpg"
//           title="Contemplative Reptile"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//             across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//         <Button size="small" color="primary">
//           Learn More
//         </Button>
//       </CardActions>
//     </Card>