const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in /api/my-hunts POST', req.query);
    let queryText = `INSERT INTO user_hunts ("user_id", "natural_area_id") VALUES ($1, $2);`
    pool.query( queryText, [ req.query.userId, 'http://services.dnr.state.mn.us/api/sna/detail/v1?id=' + req.query.endpoint])
        .then( _ => {
            res.sendStatus(200)
        }).catch( err => {
            console.log( err );
            res.sendStatus(500);
        })
});

module.exports = router;
