import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';

// import products from '../products';
import axios from 'axios';

const ProductScreen = ({ history, match }) => {
    // grab the product where the _id == _id in the request parameters
    // const product = products.find(p => p._id === match.params.id)

    // pre redux
    // const [product, setProduct] = useState({});

    // keep track of the quantity we have (in stock)
    const [qty, setQty] = useState(1); // one by default

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        // pre redux
        // const getProduct = async () => {
        //     try {
        //         const { data } = await axios.get(`/api/v1/products/${match.params.id}`);
        //         setProduct(data);
        //     } catch(err) {
        //         console.log(err);
        //     }
        // }
        // getProduct();
        
        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match])
    
    const addToCartHandler = () => {
        // push the redirect onto the history prop
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <LinkContainer to="/">
                <button className="btn btn-light my-3">Go Back</button>
            </LinkContainer>
            {/* or
            <Link className="btn btn-light my-3" to="/">
                 Go Back
            </Link> */}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
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

                                {/* only show this if they're in stock */}
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) => {
                                                        return setQty(e.target.value);
                                                    }}>
                                                        {/* E.G. let's say the countInStock is 5, we want an array like [0, 1, 2, 3, 4] */}
                                                        {[...Array(product.countInStock).keys()].map(x => {
                                                            return <option key={x + 1} value={x + 1}> {x + 1} </option>;
                                                        })}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    {/* class="btn-block" lets the element stretch all the way across */}
                                    <Button
                                        onClick={addToCartHandler}
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
            )}
        </>
    )
}

export default ProductScreen;