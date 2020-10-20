import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        // when we make our request, we want to send a headers, Content-Type of application/json
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // make our request
        const { data } = await axios.post('/api/v1/users/login', { email, password }, config)

        // we want to dispatch our user login success
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch(err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            // if error.response.data.message exists, use that. else: just use the error message
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}