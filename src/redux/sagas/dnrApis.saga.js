import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* dnrApis() {
    try {
        console.log( 'in dnrApis' );
        const response = yield axios.get('/api/dnr-apis');
        yield put({ type: 'SET_DNR_APIS', payload: response.data });
    } catch (error) {
        console.log('Error getting apis from database', error);
    }
}

function* dnrApisSaga() {
    yield takeLatest('FETCH_DNR_APIS', dnrApis);
}

export default dnrApisSaga;