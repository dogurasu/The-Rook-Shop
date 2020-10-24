import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { userListReducer } from '../reducers/userReducers';
import { listProducts } from '../actions/productActions';

const ProductListScreen = ({ history, match }) => {
    // create dispatch
    const dispatch = useDispatch();

    // get our state
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    // bring userLogin to check if user visiting link is admin or not 
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        // if we're an admin, dispatch listUsers action
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        } else { // we're not admin
            history.push('/login');
        }
    }, [dispatch, history, userInfo]) // if we delete a user, we want to reload our list of users

    // dispatch delete product
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            // DELETE PRODUCTS
        }
    }

    const createProductHandler = (product) => {
        // CREATE PRODUCT
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>Create Product
                    </Button>
                </Col>
            </Row>
            { loading 
                ? <Loader /> 
                : error 
                ? <Message variant='danger'>{error}</Message> 
                : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>
                                    ${product.price}
                                </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>
                                    {product.brand}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button 
                                        variant='danger'
                                        className='btn-sm' 
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductListScreen;