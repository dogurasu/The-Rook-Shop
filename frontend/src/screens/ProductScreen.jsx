import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
// import products from '../products';
import Axios from 'axios';

const ProductScreen = ({ match }) => {
    // grab the product where the _id == _id in the request parameters
    // const product = products.find(p => p._id === match.params.id)

    const [product, setProduct] = useState({});

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await Axios.get(`/api/v1/products/${match.params.id}`);
                setProduct(data);
            } catch(err) {
                console.log(err);
            }
        }

        getProduct();
    }, [match])

    return (
        <>
            <LinkContainer to="/">
                <button className="btn btn-light my-3">Go Back</button>
            </LinkContainer>
            {/* or
            <Link className="btn btn-light my-3" to="/">
                 Go Back
            </Link> */}
            <Row>
                <Col md={6}>
                    {/* Image component from bootstrap */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        fluid // fluid prevents img from exiting its container
                    >
                    </Image>
                </Col>
                <Col md={3}>
                    {/* variant='flush' takes away the spacing/border */}
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    {/* this is the label */}
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    {/* this is the label */}
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {/* class="btn-block" lets the element stretch all the way across */}
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={product.countInStock  === 0}
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen;