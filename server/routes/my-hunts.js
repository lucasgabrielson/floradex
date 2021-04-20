const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log( 'in api/my-hunts GET', req.params.id);
    let sqlText = `SELECT * FROM user_hunts WHERE user_id = $1`;
        pool.query(sqlText, [req.params.id])
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
router.post('/', (req, res) => {
    console.log('in /api/my-hunts POST', req.query);
    let queryText = `INSERT INTO user_hunts ("user_id", "natural_area_id") VALUES ($1, $2);`
    pool.query( queryText, [ req.query.userId, 'http://services.dnr.state.mn.us/api/sna/detail/v1?id=' + req.query.endpoint])
        .then( _ => {
            let sqlText = `SELECT * FROM user_hunts WHERE user_id = $1`;
            pool.query(sqlText, [req.query.userId])
                .then( results => {
                    res.send(results.rows);
                }).catch( err => {
                    console.log( err );
                    res.sendStatus(500);
                })
            // res.sendStatus(200)
        }).catch( err => {
            console.log( err );
            res.sendStatus(500);
        })
});

router.put('/', (req, res) => {
    console.log('in /api/my-hunts PUT', req.query);
    let queryText = `UPDATE user_hunts SET displayed = $3 WHERE user_id = $1 AND natural_area_id = $2 ;`
    pool.query( queryText, [ req.query.userId, 'http://services.dnr.state.mn.us/api/sna/detail/v1?id=' + req.query.endpoint, req.query.displayed])
        .then( _ => {
            let sqlText = `SELECT * FROM user_hunts WHERE user_id = $1`;
            pool.query(sqlText, [req.query.userId])
                .then( results => {
                    res.send(results.rows);
                }).catch( err => {
                    console.log( err );
                    res.sendStatus(500);
                })
        }).catch( err => {
            console.log( err );
            res.sendStatus(500);
        })
})

module.exports = router;
