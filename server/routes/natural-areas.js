const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

const dnrApis = [
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01065',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01038',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01024',
]

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log( 'in GET /api/natural-areas', req.params.id);
        axios.get(dnrApis[req.params.id])
            .then( response => {
                res.send(response.data)
            }).catch( err => {
                console.log( 'erroing connecting with dnr api');
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
