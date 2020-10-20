import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cardActions';

// let's get product ID from 'match'
// we need location.search for the '?qty...' part of the url
// we also want 'history' which is used to redirect
const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;

    // location.search looks like '?qty=1'
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    // useSelector takes in state - we want state.cart
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    // we only want to dispatch(addToCart) if there's a product ID
    // if we go to the regular cart page, we don't want to
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        // console.log('checkout');
        // if they're not logged in, they're going to log in
        // if they are logged in, they're going to shipping
        history.push('/login?redirect=shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {/* we want to check if we have anyhthing in our cart */}
                {cartItems.length === 0 ? (
                    <Message variant='blue'>
                        Your cart is empty <Link to="/"> Go Back</Link>
                    </Message>
                    ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => {
                            // Since we're making a list, we need unique keys!
                            return (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e) => {
                                                    return dispatch(addToCart(item.product, Number(e.target.value)));
                                                }}>
                                                    {/* E.G. let's say the countInStock is 5, we want an array like [0, 1, 2, 3, 4] */}
                                                    {[...Array(item.countInStock).keys()].map(x => {
                                                        return <option key={x + 1} value={x + 1}> {x + 1} </option>;
                                                    })}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                )}
            </Col>
            {/* subtotal summary of cart */}
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            {/* have the subtotal accurately reflect the amount of car items * cost of each item */}
                            {/* we'll use the 'reduce' higher order array method - takes in arrow func w/ accum and curr item */}
                            {/* starts at index 0 */}
                            <h2>Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0) }) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;