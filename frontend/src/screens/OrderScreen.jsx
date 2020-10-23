import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

// we want orderid so we pass in 'match' -> don't need history
const OrderScreen = ({ match }) => {
    const orderId = match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading:loadingPay, success:successPay } = orderPay; // we already have a loading and success (?) so we can rename them

    if (!loading) {
        // calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        }

        // calc all prices
        order.itemsPrice = addDecimals(order.orderItems.reduce(
            (accumulator, item) => accumulator + item.price * item.qty
        , 0));
    }

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/v1/config/paypal');

            // create a new paypal script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true); // tells us script is ready
            }

            document.body.appendChild(script);

            // we want to see thru our orderPayReducer whether 'success' is = true
            // init a piece of state to indicate when the SDK is ready

        }

        // addPayPalScript();

        // check for the order and also make sure that the orderId matches the Id in the URL
        // if it doesn't, then dispatch getOrderDetails() to fetch the most recent order
        // also after we have a successful dispatch (pay)
        if (!order || order._id !== orderId || successPay) {
            dispatch({ type: ORDER_PAY_RESET }) // if we don't do this, once you pay it's going to keep refreshing
            dispatch(getOrderDetails(orderId)); // we want to dispatch our actions
        } else if(!order.isPaid) { // if not paid, check if paypal script is there
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true); // set sdk to true bc paypalscript exists
            }
        }
    }, [order, orderId, successPay])

    // this event handler will update database to paid
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    }

    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address},{' '}
                                {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? 
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message> : 
                                <Message variant='danger'>Not Delivered</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? 
                                <Message variant='success'>Paid on {order.paidAt}</Message> : 
                                <Message variant='danger'>Not Paid</Message>
                            }
                        </ListGroup.Item>
                        {/* <ListGroup.Item> */}
                        {error && <Message variant='danger'>{error}</Message>}
                        {/* </ListGroup.Item> */}
                        {/* Show all items we're ordering */}
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                <ListGroup variant="flush">
                                    {/* loop thru (map) our cart items and create a list */}
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            {/* separate each item into a listgroup item for nice spacing */}
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen;