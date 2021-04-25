const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log( 'in GET /api/admin');
    let queryText = `SELECT * FROM natural_areas_hunts_flora WHERE substantiated = false`;
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