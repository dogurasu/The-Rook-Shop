import React, { useEffect } from 'react'; // add products as component level state, products is eventually going to be global state when we get into Redux
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions'
// import axios from 'axios'; // get rid of bc now we have Redux
// import products from '../products'; // now we request products from our backend

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;

    // we don't need to set products for our local, component level state anymore
    // const [products, setProducts ] = useState([]);

    const pageNumber = match.params.pageNumber || 1;

    // we're using hooks here
    // in the past, we would've used a higher order method called Connect and we'd have to map state to props
    const dispatch = useDispatch();

    // i want to get the 'productList' piece of state that we provided as an argument to the combineReducers function in our store
    // useSelector takes in an arrow function w/ 'state' as arg and returns which part of state we want
    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages} = productList; // we want all these parts of state that could be passed down

    useEffect(() => {
        // code when we didn't use Redux
        // const getProducts = async () => {
        //     try {
        //         const { data } = await axios.get('/api/v1/products', {
        //             port: 5000
        //         })

        //         setProducts(data);
        //     } catch(err) {
        //         console.log(err);
        //     }
        // }
        // getProducts();

        // use the dispatch in useEffect hook because it does the same thing, makes request to backend to get products
        dispatch(listProducts(keyword, pageNumber));

    }, [dispatch, keyword, pageNumber])

    // check to see if if it's loading so we can output a spinner
    // we can also check to see if there's an error
    return (
        <>
        <Meta />
        {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1>Latest Products</h1>
            {loading ? (
            <Loader />
            ) : error ? (
            <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map(product => {
                            return (
                                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                    <Product product={product}/>
                                </Col>
                            )
                        })}
                    </Row>
                    <Paginate 
                        pages={pages} 
                        page={page} 
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    );
}

export default HomeScreen;