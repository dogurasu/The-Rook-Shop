import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { 
    listProductDetails, 
    createProductReview 
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

// import products from '../products';
import axios from 'axios';

const ProductScreen = ({ history, match }) => {
    // grab the product where the _id == _id in the request parameters
    // const product = products.find(p => p._id === match.params.id)

    // pre redux
    // const [product, setProduct] = useState({});

    // keep track of the quantity we have (in stock)
    const [qty, setQty] = useState(1); // one by default

    // use state to keep track of our forms for adding review
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    // make sure our user is logged in order to leave a review
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { error: errorProductReview, success: successProductReview } = productReviewCreate;

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

        if (successProductReview) {
            alert('Review Submitted!');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        
        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match, successProductReview])
    
    const addToCartHandler = () => {
        // push the redirect onto the history prop
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const commentSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }));
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
                <>
                <Meta title={product.name} />
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
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review.</h2>
                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                    {userInfo
                                    ? (
                                        <Form onSubmit={commentSubmitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Button type='submit' variant='primary'>
                                                Submit
                                            </Button>
                                        </Form>
                                    ) 
                                    : <Message>Please <Link to='/login'>sign in</Link> to write a review.</Message>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default ProductScreen;