import {
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAILURE,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAILURE,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAILURE,
    ORDER_LIST_SINGLE_REQUEST,
    ORDER_LIST_SINGLE_SUCCESS,
    ORDER_LIST_SINGLE_FAILURE,
    ORDER_LIST_ALL_REQUEST,
    ORDER_LIST_ALL_SUCCESS,
    ORDER_LIST_ALL_FAILURE,
    ORDER_DELIVER_RESET,
    ORDER_DELIVER_FAILURE,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS
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

// getOrderDetails action -- takes in user, need to send a token so we getState
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
        const { data } = await axios.get(`/api/v1/orders/${order_id}`, config);

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

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json', // we need content type for a PUT request
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // post request to 'api/v1/orders/:id/pay'
        // we don't pass the order in bc the order is already there
        // we're setting 'isPaid' to true instead to new Date();
        const { data } = await axios.put(`/api/v1/orders/${orderId}/pay`, paymentResult, config);

        // we want to dispatch our user details
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })

    } catch(err) {
        dispatch({
            type: ORDER_PAY_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // post request to 'api/v1/orders/:id/pay'
        // we don't pass the order in bc the order is already there
        // we're setting 'isPaid' to true instead to new Date();
        const { data } = await axios.put(`/api/v1/orders/${order._id}/deliver`, {}, config);

        // we want to dispatch our user details
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        })

    } catch(err) {
        dispatch({
            type: ORDER_DELIVER_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

// we don't have to pass anything in here - it knows who we are by our token
export const listSingleList = () => async (dispatch, getState) => { 
    try {
        dispatch({
            type: ORDER_LIST_SINGLE_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                // don't need content-type here
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // get to 'api/v1/orders/myorders'
        const { data } = await axios.get(`/api/v1/orders/myorders`, config);

        // we want to dispatch our user details
        dispatch({
            type: ORDER_LIST_SINGLE_SUCCESS,
            payload: data,
        })

    } catch(err) {
        dispatch({
            type: ORDER_LIST_SINGLE_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

// we don't have to pass anything in here - it knows who we are by our token
export const listAllOrders = () => async (dispatch, getState) => { 
    try {
        dispatch({
            type: ORDER_LIST_ALL_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // get to 'api/v1/orders/myorders'
        const { data } = await axios.get(`/api/v1/orders`, config);

        // we want to dispatch our user details
        dispatch({
            type: ORDER_LIST_ALL_SUCCESS,
            payload: data,
        })

    } catch(err) {
        dispatch({
            type: ORDER_LIST_ALL_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}