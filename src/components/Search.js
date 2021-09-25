import React from "react";
import {Button, Form, InputGroup} from "react-bootstrap";

const search = ({handleSearchCertificates, handleChangeFilter, page, filter}) => {
    console.log(page);
    console.log('Filter: ' + filter);

    const handleChange = (event) => {
        handleChangeFilter(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleSearchCertificates(filter, 1, page.size);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mt-3" size="lg">
                <Form.Control type="text" placeholder="Search" onChange={handleChange} value={filter}/>
                <Button type="submit">Search</Button>
            </InputGroup>
        </Form>
    )
}

export default search;