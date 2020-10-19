import React, { useState, useEffect } from 'react'; // add products as component level state, products is eventually going to be global state when we get into Redux
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
// import products from '../products'; // now we request products from our backend

const HomeScreen = () => {
    const [products, setProducts ] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await axios.get('/api/v1/products', {
                    port: 5000
                })

                setProducts(data);
            } catch(err) {
                console.log(err);
            }
        }

        getProducts();
    }, [])

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => {
                    return (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product}/>
                        </Col>
                    )
                })}
            </Row>
        </>
    );
}


export default HomeScreen;