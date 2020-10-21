import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    const dispatch = useDispatch();

    // get our userRegister state
    const userRegister = useSelector(state => state.userRegister);

    // we want the same stuff as login: userinfo, etc
    const { loading, error, userInfo } = userRegister; // get all from reducer

    // submit handler
    const redirect = location.search ? location.search.split('=')[1] : '/';

    // redirect if already logged in
    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]) // if userInfo changes, we want to redirect

    // this is where we want to dispatch the register action
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match'); // sets our message state
        }else { // they do match, we're good to go
            // DISPATCH REGISTER
            dispatch(register(name, email, password));
        }
    }
    // bring userInfo in 

    return (
        <FormContainer>
            <h1> Sign Up</h1>
            {/* check for the loading in error */}
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                    Register
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an Account?{' '} <Link to={redirect ? `/login?redirect=${redirect}` : '/login' }>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;