import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import "./SearchBox.css";
export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/designers/search?query=${query}` : '/designers/search');
  };

  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <InputGroup className='form-group'>
        <FormControl
        className='search-input'
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search designers..."
          aria-label="Search designers"
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search" >
          <i className="fas fa-search" id='search-icon'></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
