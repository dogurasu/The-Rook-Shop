import {
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAILURE,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAILURE
} from '../constants/orderConstants.js';
import axios from 'axios';

// createOrder 
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

// updateUserProfile action -- takes in user, need to send a token so we getState
export const getOrderDetails = (order_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                // 'Content-Type': 'application/json', // don't need content type for GET request
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // post request to 'api/v1/orders'
        const { data } = await axios.get(`/api/v1/orders${order_id}`, config);

        // we want to dispatch our user details
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(err) {
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}