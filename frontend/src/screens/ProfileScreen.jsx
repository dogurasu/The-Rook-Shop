import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

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

    // redirect if already logged in
    useEffect(() => {
        if (!userInfo) { // if user not logged in, redirect to '/login'
            history.push('/login');
        } else { // check for user
            if (!user.name) {
                dispatch(getUserDetails('profile')); // takes in an id but in this case, takes in a profile
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
            </Col>
        </Row>
    )
}

export default ProfileScreen;