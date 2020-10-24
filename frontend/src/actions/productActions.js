import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
} from '../constants/productConstants';

// does pretty much what our useEffect hook did in our Home component - fetched products data from /api/v1/products, mapped them thru
// instead of fetching them w/ the useEffect hook, we're going to do it thru this action
// we're going to dispatch actions to the reducer
// you can think of these as action creators 
//      - action reducers are functions (listProducts)
//      - the imported items are actual 'Actions'
// Redux thunk allows us to add a function w/in a function
// this is how we 'dispatch' these actions
//      - using the 'dispatch' arg
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get('/api/v1/products');

        // if we successfully retrieve data from our backend, we dispatch it with 'success'
        // else, we'll catch the error down there
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message// if error.response.data.message exists, use that. else: just use the error message
        })
    }
}

// this takes Action takes in an 'id' because we have to know which product are we retrieving specifically
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/products/${id}`);

        // if we successfully retrieve data from our backend, we dispatch it with 'success'
        // else, we'll catch the error down there
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message// if error.response.data.message exists, use that. else: just use the error message
        })
    }
}

export const deleteProduct = (product_id) => async (dispatch, getState) => { 
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // DELETE to 'api/v1/products/:product_id'
        await axios.delete(`/api/v1/products/${product_id}`, config);

        // we want to dispatch our user details
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    } catch(err) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

// just creates that sample product
export const createProduct = () => async (dispatch, getState) => { 
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // POST new product to 'api/v1/products/'
        const { data } = await axios.post(`/api/v1/products`, {}, config);

        // we want to dispatch our user details
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}