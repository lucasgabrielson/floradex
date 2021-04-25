const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log( 'in api/leaderboard GET' );
    let sqlText = `SELECT COUNT(substantiated), "user".username, user_id
                    FROM natural_areas_hunts_flora
                    JOIN "user" ON "user".id = natural_areas_hunts_flora.user_id
                    WHERE natural_areas_hunts_flora.substantiated = true
                    GROUP BY username, user_id
                    ORDER BY COUNT(substantiated) DESC;
                    `;
        pool.query(sqlText)
            .then( results => {
                res.send(results.rows);
            }).catch( err => {
                console.log( err );
                res.sendStatus(500);
            })    
});

/**
 * POST route template
 */
router.get('/:id', (req, res) => {
    console.log( 'in api/leaderboard GET' );
    let sqlText = `SELECT COUNT(*) from "user"`;
        pool.query(sqlText)
            .then( results => {
                res.send(results.rows);
            }).catch( err => {
                console.log( err );
                res.sendStatus(500);
            })    
});

module.exports = router;
