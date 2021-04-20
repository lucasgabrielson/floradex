import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* naturalAreas(action) {
    for( let i = 0; i < 3; i++) {
        try {
            console.log( 'in naturalAreas' );
            const response = yield axios.get('/api/natural-areas/' + i);
            yield put({ type: 'SET_NATURAL_AREAS', payload: response.data });
        } catch (error) {
            console.log('Error getting natural areas from dnr api', error);
        }
    }
    
}

function* naturalAreasSaga() {
    yield takeLatest('FETCH_NATURAL_AREAS', naturalAreas);
}

export default naturalAreasSaga;