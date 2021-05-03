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
 * PUT route template
 */
router.put('/', (req, res) => {
    console.log( 'in UPDATE /api/admin', req.query);
    let queryText = `UPDATE natural_areas_hunts_flora SET "substantiated" = true WHERE user_id = $1 AND natural_area_id = $2 AND common_name = $3`;
    pool.query(queryText, [req.query.id, req.query.area_id, req.query.cname])
        .then( results => {
            res.sendStatus(200);
        }).catch( err => {
            console.log( 'error', err);
            res.sendStatus(500);
        })
});

module.exports = router;