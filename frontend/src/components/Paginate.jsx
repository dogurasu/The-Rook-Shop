import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword=''}) => {
    // the following is the same as "if (pages > 1) { ... }":
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                // The link here depends on whether there is a keyword ornot
                // we defined 2 routes in App.js - if keyword, we want the 'search', else, we just want homepage w/ page #
                <LinkContainer 
                    key={x + 1} 
                    to={
                        !isAdmin 
                        ? keyword 
                        ? `/search/${keyword}/page/${x + 1}` 
                        : `/page/${x + 1}`
                        : `/admin/productlist/${x + 1}`
                    }>
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate;