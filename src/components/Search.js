import React from "react";
import {Button, Form, InputGroup} from "react-bootstrap";

const search = (props) => {
    return (
        <Form>
            <InputGroup className="mt-3" size="lg">
                <Form.Control type="text" placeholder="Search"/>
                <Button type="submit">Search</Button>
            </InputGroup>
        </Form>
    )
}

export default search;