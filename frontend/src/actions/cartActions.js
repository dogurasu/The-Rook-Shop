import axios from 'axios'; // we have axios bc when we add an item to the cart, we want to make a request to API products w/ the ID to get the fields (data) for that particular product
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants';


export const addToCart = (id, qty) => async (dispatch, getState) => {
    // we're going to be saving our entire cart to localStorage so along w/ dispatch, we can pass 'getState' which lets us get our entire state Tree
    // any time we want something like product list, details or cart, we can just grab it w/ getState.__
    const { data } = await axios.get(`/api/v1/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    // we use getState to save the entire cart
    // this gives us JSON so we call JSON.stringify to change it to string ofr now
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

// we pass in dispatch (to dispatch to our reducer) and getState so that we can get all the items in our cart so we can reset localStorage to whatever items are in our cart minus what we want to remove
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

// we pass in dispatch (to dispatch to our reducer) and getState so that we can get all the items in our cart so we can reset localStorage to whatever items are in our cart minus what we want to remove
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (method) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: method
    })

    localStorage.setItem('paymentMethod', JSON.stringify(method));
}