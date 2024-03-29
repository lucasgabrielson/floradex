const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

const dnrApis = [
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01065',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01038',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01024',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01079',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01057',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00962',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01059',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00951',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00996',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01002',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01052',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01005',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01034',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02005',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01023',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01049',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02004',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00955',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00957',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01101',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01081',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01094',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02016',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01027',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02066',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01072',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02010',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00963',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01013',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00988',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00985',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02043',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02070',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02056',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01080',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01063',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00949',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01014',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01036',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01058',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00959',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00989',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01084',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02068',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01048',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01042',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01001',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02014',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02011',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02007',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02059',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01053',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02060',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01099',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01071',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01056',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01035',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02046',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02042',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00954',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02067',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02001',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00999',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02038',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01000',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02052',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01011',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01040',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00966',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00984',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00978',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00961',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02040',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01064',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02018',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01022',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01046',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01043',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00991',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02026',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01047',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02013',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02022',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01095',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00980',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01004',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02044',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00971',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01098',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01061',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00977',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02045',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02020',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02015',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01037',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02055',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00979',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02032',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01075',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02027',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02049',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01015',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02034',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01051',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02063',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01070',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02002',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01066',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01041',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01062',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01086',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01039',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01055',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01068',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01073',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00967',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02054',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02012',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02000',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02030',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02028',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02025',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02021',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02048',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01026',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01031',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01069',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01074',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01097',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02008',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02062',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00968',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02006',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02036',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01054',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00950',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01087',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02065',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02051',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02003',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00953',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02009',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00972',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00958',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01033',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02037',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01018',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01077',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01030',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01078',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna00960',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01050',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02023',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01017',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna01045',
    'http://services.dnr.state.mn.us/api/sna/detail/v1?id=sna02017'
]

/**
 * GET http://localhost:300/api/my-hunts/1
 * Returns an sna object from DNR API:
 * For domentation see documentation/dnr_api_document/documentation.md
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

router.get('/', (req, res) => {
    console.log( 'in GET /api/natural-areas', req.query.id);
        axios.get('http://services.dnr.state.mn.us/api/sna/detail/v1?id=' + req.query.id)
            .then( response => {
                res.send(response.data)
            }).catch( err => {
                console.log( 'erroing connecting with dnr api');
                res.sendStatus(500);
            })
});


module.exports = router;
