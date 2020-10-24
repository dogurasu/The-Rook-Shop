import axios from 'axios';
import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGOUT, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_DETAILS_REQUEST, 
    USER_DETAILS_SUCCESS, 
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST, 
    USER_UPDATE_PROFILE_SUCCESS, 
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS
} from '../constants/userConstants';
import { ORDER_LIST_SINGLE_RESET } from "../constants/orderConstants";

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

// do 2 things: 
//      1. remove userInfo from localStorage
//      2. dispatch userLogout action w/ the userLogout constant
//      3. reset the list of orders if we log out of a user
//      4. reset the user list if we log out of admin user
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_SINGLE_RESET })
    dispatch({ type: USER_LIST_RESET })
}

// register action
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        // when we make our request, we want to send a headers, Content-Type of application/json
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // make our request
        const { data } = await axios.post('/api/v1/users', {name, email, password }, config)

        // we want to dispatch our user login success
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        // log the user in right away after registering
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        // we want the same effect as logging in
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch(err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            // if error.response.data.message exists, use that. else: just use the error message
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

// getUserDetails action
// we bring in getState bc we need our JWT and we can get our userInfo from getState
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();

        // when we make our request, we want to send a headers, Content-Type of application/json
        // we neeed to pass our token here
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // console.log(userInfo);
        // console.log(config);
        // console.log(id);

        // make our request
        // id might be profile so when we call it from the 'profile' screen, we're going to pass in 'profile' as the id
        const { data } = await axios.get(`/api/v1/users/${id}`, config); // this gets profile, not the actual user's id

        // console.log("here");

        // we want to dispatch our user details
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(err) {
        console.log('Err: ' + err);
        dispatch({
            type: USER_DETAILS_FAIL,
            // if error.response.data.message exists, use that. else: just use the error message
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

// updateUserProfile action -- takes in user, need to send a token so we getState
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // put request to 'api/v1/users/profile'
        const { data } = await axios.put(`/api/v1/users/profile`, user, config);

        // we want to dispatch our user details
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })

    } catch(err) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

// updateUserProfile action -- takes in user, need to send a token so we getState
export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // put request to 'api/v1/users/profile'
        const { data } = await axios.get(`/api/v1/users`, config);

        // we want to dispatch our user details
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })

    } catch(err) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

// updateUserProfile action -- takes in user, need to send a token so we getState
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        // getState.userLogin.userInfo
        const { userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // put request to 'api/v1/users/profile'
        const { data } = await axios.delete(`/api/v1/users/${id}`, config);

        // we want to dispatch our user details
        dispatch({
            type: USER_DELETE_SUCCESS,
        })

    } catch(err) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}