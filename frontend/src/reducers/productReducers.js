import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL
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
            return { 
                loading: false, 
                products: action.payload.products, 
                pages: action.payload.pages, 
                page: action.payload.page 
            } // we send the payload of data that is returned with success
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

export const productDeleteReducer = ( state = {}, action) => {
    switch(action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productCreateReducer = ( state = {}, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = ( state = { product: {} }, action) => {
    switch(action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload}
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productReviewCreateReducer = ( state = {}, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

export const productTopRatedReducer = ( state = { products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}