import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails } from '../actions/userActions';

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ message, setMessage ] = useState('');

    const dispatch = useDispatch();

    // get our userRegister state
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    // redirect if already logged in
    useEffect(() => {
        // userId comes from url
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else { // user is already here
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, userId, user])

    // this is where we want to dispatch the register action
    const submitHandler = (e) => {
        e.preventDefault();
        
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading 
                    ? <Loader /> 
                    : error 
                    ? <Message variant='danger'>{error}</Message> 
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
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

                            <Form.Group controlId="isadmin">
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                        </Form>
                    )
                }
            </FormContainer>
        </>
    )
}

export default UserEditScreen;