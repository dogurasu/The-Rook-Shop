import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // uses HTML5 History API - uses push state, replace state, Hash Router uses hash portion of the URL
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const CheckoutSteps = ( { step1, step2, step3, step4 }) => {
  return (
      <Nav className='justify-content-center mb-4'>
        {/* Step1 - if passed as prop, then add link to login page */}
        {/* If Step1 not there, we'll still show Sign-In but w/ a lighter color */}
          <Nav.Item>
              {step1 ? (
                  <LinkContainer to='/login'>
                      <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
              ) : <Nav.Link disabled>Sign In</Nav.Link>}
          </Nav.Item>
        {/* Step2 - for shipping */}
          <Nav.Item>
              {step2 ? (
                  <LinkContainer to='/shipping'>
                      <Nav.Link>Shipping</Nav.Link>
                  </LinkContainer>
              ) : <Nav.Link disabled>Shipping</Nav.Link>}
          </Nav.Item>
          <Nav.Item>
              {/* Step1 - if passed as prop, then add link to login page */}
              {/* If Step1 not there, we'll still show sign in but w/ a lighter color */}
              {step3 ? (
                  <LinkContainer to='/payment'>
                      <Nav.Link>Payment</Nav.Link>
                  </LinkContainer>
              ) : <Nav.Link disabled>Payment</Nav.Link>}
          </Nav.Item>
          <Nav.Item>
              {/* Step1 - if passed as prop, then add link to login page */}
              {/* If Step1 not there, we'll still show sign in but w/ a lighter color */}
              {step4 ? (
                  <LinkContainer to='/placeorder'>
                      <Nav.Link>Place Order</Nav.Link>
                  </LinkContainer>
              ) : <Nav.Link disabled>Place Order</Nav.Link>}
          </Nav.Item>
      </Nav>
  );
}

export default CheckoutSteps;
