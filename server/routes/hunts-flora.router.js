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
    console.log('in /api/hunts-flora POST', req.query);
    let queryText = `INSERT INTO natural_areas_hunts_flora ("common_name", "scientific_name", "user_id", "natural_area_id", "image" ) VALUES ($1, $2, $3, $4, $5);`
    pool.query( queryText, [ req.query.cname, req.query.sname, req.query.id, 'http://services.dnr.state.mn.us/api/sna/detail/v1?id=' + req.query.endpoint, req.query.image])
        .then( _ => {
            res.sendStatus(200)
        }).catch( err => {
            console.log( err );
            res.sendStatus(500);
        })
});

module.exports = router;
