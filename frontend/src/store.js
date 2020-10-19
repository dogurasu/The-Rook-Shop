import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';

// initialize reducer - {} if we don't have any yet
// important bc productList is what shows as that piece of state

// it's good to break everything into separate reducers because that makes it easier to debug and it causes less issues w/ the wrong piece of state being displayed
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
});

// if we want something to be loaded when the Redux store loads initially, we can put it in here
const initialState = {};

// you can have an array of middleware and init it with thunk
const middleware = [thunk]

// initialize store by calling createStore and passing in a 'reducer'
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;