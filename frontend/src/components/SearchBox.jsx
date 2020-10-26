import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// since SearchBox will be embedded in the header, we won't have direct access to props.history, we're going to have to use something called a 'render prop'
const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/'); // else, redirect to home page
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control 
                type='text' 
                name='q' 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder='Search Products'
                className='mr-sm-2 ml-sm-5'
            >
            </Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox;