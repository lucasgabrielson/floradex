import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* admin() {
    try {
        console.log( 'in dnrApis' );
        const response = yield axios.get('/api/admin');
        yield put({ type: 'SET_ADMIN', payload: response.data });
    } catch (error) {
        console.log('Error getting admin information from database', error);
    }
}

function* adminSaga() {
    yield takeLatest('GET_ADMIN', admin);
}

export default adminSaga;
