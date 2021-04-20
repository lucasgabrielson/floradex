const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET http://localhost:300/api/dnr-apis
 * Returns an array of MN DNR SNA API endpoint objects:
 * {
 *  "id": 155
 *  "dnr_api": 'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01045'
 * }
 */

router.get('/', (req, res) => {
    console.log( 'in GET /api/dnr-apis');
    let queryText = `SELECT * FROM natural_areas`;
    pool.query(queryText)
        .then( results => {
            res.send( results.rows );
        }).catch( err => {
            console.log( 'error', err);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;