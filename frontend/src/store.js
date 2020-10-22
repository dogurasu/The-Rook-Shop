import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';
// initialize reducer - {} if we don't have any yet
// important bc productList is what shows as that piece of state

// it's good to break everything into separate reducers because that makes it easier to debug and it causes less issues w/ the wrong piece of state being displayed
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer
});

// we're going to check if items exist in the cart (fetch it from localstorage)
// if they exist, we'll parse the string back to JSON and store it ina  var
// else, store an empty list

// we'll also check if there is a shipping address that has been input
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) 
    : {};

// if (localStorage.getItem('cartItems')) {
//     const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems'));
// } else {
//     const cartItemsFromStorage = []
// }

// if we want something to be loaded when the Redux store loads initially, we can put it in here
// when store loads, we load our cart (or what's not in it)
const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
};

// you can have an array of middleware and init it with thunk
const middleware = [thunk]

// initialize store by calling createStore and passing in a 'reducer'
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;