const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET https://trefle.io/api/v1/plants/search?q=Bromus inermis&limit=3&token=API_KEY
 * Returns an object
 * For documentation see documentation/trefle_api_documentation/document
 * Return response.data if successfull
 * Otherwise send 500
 */
router.get('/:sname', (req, res) => {
    console.log( 'in /api/trefle-apis', req.params.sname)
    axios.get(`https://trefle.io/api/v1/plants/search?q=${req.params.sname}&limit=3&token=ZD_NkUg96KW7O06X5qjgqASTwrIdvaYplcbOG0AaRm8`)
        .then( response => {
            res.send( response.data );
        }).catch( err => {
            console.log(err);
            res.sendStatus(500);
        })
});


module.exports = router;