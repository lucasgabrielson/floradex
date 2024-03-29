const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const dnrApisRouter = require('./routes/dnr-apis');
const naturalAreasRouter = require('./routes/natural-areas');
const myHuntsRouter = require('./routes/my-hunts');
const trefleApisRouter = require('./routes/trefle-apis');
const huntsFloraRouter = require('./routes/hunts-flora.router');
const leaderboardRouter = require('./routes/leaderboard.router');
const adminRouter = require('./routes/admin.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/dnr-apis', dnrApisRouter);
app.use('/api/natural-areas', naturalAreasRouter);
app.use('/api/my-hunts/', myHuntsRouter);
app.use('/api/trefle-apis/', trefleApisRouter);
app.use('/api/hunts-flora/', huntsFloraRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/admin', adminRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
