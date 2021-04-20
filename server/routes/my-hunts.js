const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET http://localhost:300/api/my-hunts/1
 * Returns an array of user_hunt objects:
 * {
 *  "id": 3
 *  "user_id": 2 FOREIGN KEY
 *  "natural_area_id": 'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00999' FOREIGN KEY
 *  "displayed": true
 * }
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
 * POST http://localhost:300/api/my-hunts/?userId=1&endpoint='http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00999'
 * Sends a user_hunt object
 * Returns 200 OK if successful;
 * Else, 500 status
 * {
 *  "id": 3
 *  "user_id": 2 FOREIGN KEY
 *  "natural_area_id": 'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00999' FOREIGN KEY
 *  displayed is not send because it's default is true
 * }
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

/**
 * PUT http://localhost:300/api/my-hunts/?userId=1&endpoint='http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00999'
 * Updates displayed value to !displayed
 * Returns 200 OK if successful;
 * Else, 500 status
 */

router.put('/', (req, res) => {
    console.log('in /api/my-hunts PUT', req.query);
    let queryText = `UPDATE user_hunts SET displayed = $3 WHERE user_id = $1 AND natural_area_id = $2 ;`
    pool.query( queryText, [ req.query.userId, 'http://services.dnr.state.mn.us/api/sna/detail/v1?id=' + req.query.endpoint, req.query.displayed])
        .then( _ => {
            res.sendStatus(200);
        }).catch( err => {
            console.log( err );
            res.sendStatus(500);
        })
})

module.exports = router;
