import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import dnrApis from './dnrApis.reducer';
import naturalAreas from './naturalAreas.reducer';
import userHunts from './userHunts.reducer';
import naturalArea from './naturalArea.reducer';
import trefleApis from './trefleApis.reducer';
import naturalAreasProcessing from './naturalAreasProcessing.reducer';
import userHuntItems from './userHuntItems.reducer';
import leaderboard from './leaderboard.reducer';
import totalUsers from './totalUsers.reducer';
import admin from './admin.reducer';
import drawer from './drawer.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  dnrApis,
  naturalAreas,
  userHunts,
  naturalArea,
  trefleApis,
  naturalAreasProcessing,
  userHuntItems,
  leaderboard,
  totalUsers,
  admin,
  drawer,
});

export default rootReducer;
