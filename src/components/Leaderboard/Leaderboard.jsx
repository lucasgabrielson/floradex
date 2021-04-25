import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

const Leaderboard = () => {
    useEffect(() => { dispatch({type: 'GET_LEADERBOARD', payload: id.id}) }, []);

    const id = useParams();

    const dispatch = useDispatch();

    return (
        <div>
            
        </div>
    )
}

export default Leaderboard

