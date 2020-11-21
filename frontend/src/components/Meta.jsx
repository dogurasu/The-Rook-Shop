// a wrapper for react-helmet
import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: "Welcome to The Rook Shop",
    description: "We sell the best chess products for the optimal price.",
    keywords: 'chess, chess pieces, chess boards, chess merch, best chess prices'
}

export default Meta;