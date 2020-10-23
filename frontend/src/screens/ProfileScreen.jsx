import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listSingleList } from '../actions/orderActions';

const ProfileScreen = ({ location, history }) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    const dispatch = useDispatch();

    // get our user details from state
    const userDetails = useSelector(state => state.userDetails);
    // we want the same stuff as login: userinfo, etc
    const { loading, error, user } = userDetails; // get all from reducer

    // check if user logged in - if they're not, we don't want them to acess this page
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin; // get all from reducer

    // get success value upon successful update of user profile
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    // get orders
    const orderListSingle = useSelector(state => state.orderListSingle);
    const { loading:loadingOrders , error:errorOrders, orders } = orderListSingle;

    // redirect if already logged in
    useEffect(() => {
        if (!userInfo) { // if user not logged in, redirect to '/login'
            history.push('/login');
        } else { // check for user
            if (!user.name) {
                dispatch(getUserDetails('profile')); // takes in an id but in this case, takes in a profile
                dispatch(listSingleList());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, user]) // if userInfo changes, we want to redirect

    // this is where we want to dispatch the register action
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match'); // sets our message state
        }else { // they do match, we're good to go
            // DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile( {id: user._id, name, email, password} )); // we want to pass in a user obj
        }
    }
    // bring userInfo in

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders 
                    ? <Loader /> 
                    : errorOrders
                    ? <Message variant='danger'>{errorOrders}</Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            {order.isPaid 
                                                ? order.paidAt.substring(0, 10) 
                                                : (
                                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {order.isDelivered 
                                                ? order.deliveredAt.substring(0, 10) 
                                                : (
                                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button classname='btn-sm' variant='light'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                }
            </Col>
        </Row>
    )
}

export default ProfileScreen;