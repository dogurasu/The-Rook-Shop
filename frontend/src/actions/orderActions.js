import {
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAILURE
} from '../constants/orderConstants.js';
import axios from 'axios';

// updateUserProfile action -- takes in user, need to send a token so we getState
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // post request to 'api/v1/orders'
        const { data } = await axios.post(`/api/v1/orders`, order, config);

        // we want to dispatch our user details
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })

    } catch(err) {
        dispatch({
            type: ORDER_CREATE_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}
