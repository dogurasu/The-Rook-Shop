import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants';

import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants';

// a reducer takes in 2 things, initial state (can be default arg of emtpy obj), and an action -> we're going to dispatch an action to productReducer (action will be an object with a 'type' and maybe a 'payload' of data)
// productListReducer handles the listing of products in our state
export const productListReducer = (state = { products: [] }, action) => {
    // you want to evaluate the type (choose the correct action for the specified type)
    // 3 different action types: 
    //      - productList request: when we actually make the fetch request
    //      - productList success: when we get a successful resopnse and get data
    //      - productList fail: we send an error thru the state 
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] } // when we make the request, we want the component to knwo that it's currently fetching/loading
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload } // we send the payload of data that is returned with success
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload } // we send error in the payload
        default:
            return state
    }
}

export const productDetailsReducer = (
    state = { product: { reviews: [] } },
    action
) => {
    // you want to evaluate the type (choose the correct action for the specified type)
    // 3 different action types: 
    //      - productList request: when we actually make the fetch request
    //      - productList success: when we get a successful resopnse and get data
    //      - productList fail: we send an error thru the state 
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state } // when we make the request, we want the component to knwo that it's currently fetching/loading
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload } // we send the payload of data that is returned with success
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload } // we send error in the payload
        default:
            return state
    }
}