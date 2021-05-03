import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* admin() {
    try {
        console.log( 'in admin' );
        const response = yield axios.get('/api/admin');
        yield put({ type: 'SET_ADMIN', payload: response.data });
    } catch (error) {
        console.log('Error getting admin information from database', error);
    }
}

function* substantiate(action) {
    try {
        console.log( 'in substantiate' );
        const response = yield axios.put(`/api/admin/?id=${action.payload.id}&area_id=${action.payload.area_id}&cname=${action.payload.cname}`);
        yield put({ type: 'GET_ADMIN'});
    } catch (error) {
        console.log('Error getting admin information from database', error);
    }
}

function* adminSaga() {
    yield takeLatest('GET_ADMIN', admin);
    yield takeLatest('SUBSTANTIATE', substantiate);
}

export default adminSaga;
