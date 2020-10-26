import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { userListReducer } from '../reducers/userReducers';
import { listAllOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
    // create dispatch
    const dispatch = useDispatch();

    // get our state
    const orderListAll = useSelector(state => state.orderListAll);
    const { loading, error, orders } = orderListAll;

    // bring userLogin to check if user visiting link is admin or not 
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        // if we're an admin, dispatch listUsers action
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAllOrders());
        } else { // we're not admin
            history.push('/login');
        }
    }, [dispatch, history, userInfo]) // if we delete a user, we want to reload our list of users

    return (
        <>
            <h1>Orders</h1>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>
                                    {order.createdAt.substring(0, 10)}
                                </td>
                                <td>
                                    ${order.totalPrice}
                                </td>
                                <td>
                                    {order.isPaid
                                        ? order.paidAt.substring(0, 10)
                                        : (<i className='fas fa-times' style={{color: 'red'}}></i>)
                                    }
                                </td>
                                <td>
                                    {order.isDelivered
                                        ? order.deliveredAt.substring(0, 10)
                                        : (<i className='fas fa-times' style={{color: 'red'}}></i>)
                                    }
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}
export default OrderListScreen;