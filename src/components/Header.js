import React, {useState} from "react";
import {Button, Col, InputGroup, Navbar, Row} from "react-bootstrap";
import "./Header.css"
import {useDispatch, useSelector} from "react-redux";
import {authLogout} from "../action/createActions";
import {logout} from "../services/auth.service";
import Profile from "./Profile";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Tags from "./Tags";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = () => {
        logout();
        dispatch(authLogout());
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="Header justify-content-between px-4">
            <div className="d-flex justify-content-start">
                <Navbar.Brand href="#home">Admin UI</Navbar.Brand>
                {localStorage.getItem('role') === 'ROLE_ADMIN' ?
                    <>
                        <Button variant="primary" onClick={handleShow}>Add new</Button>

                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                            centered
                            size="lg"
                        >
                            <Modal.Header className="bg-secondary" closeButton>
                                <Modal.Title>Add new certificate</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group as={Row} className="mb-3" controlId="title">
                                        <Form.Label column sm="2">
                                            Title
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" placeholder="Title"/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="description">
                                        <Form.Label column sm="2">
                                            Description
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control as="textarea" rows={5}/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="duration">
                                        <Form.Label column sm="2">
                                            Duration
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" placeholder="Duration"/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="price">
                                        <Form.Label column sm="2">
                                            Price
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" placeholder="Price"/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="tags">
                                        <Form.Label column sm="2">
                                            Tags
                                        </Form.Label>
                                        <Col sm="10">
                                            <InputGroup>
                                                <Form.Control type="text" placeholder="Tags"/>
                                                <Button variant="primary">Add</Button>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                </Form>

                                <Tags/>

                                <div className="d-flex align-items-center justify-content-center">
                                    <Button className="mx-2" variant="primary" type="submit">
                                        Save
                                    </Button>
                                    <Button className="mx-2"  variant="secondary">
                                        Cancel
                                    </Button>
                                </div>

                            </Modal.Body>
                        </Modal>
                    </> : null}
            </div>
            <div className="d-flex justify-content-end">
                {localStorage.getItem('username') ? <Profile username={localStorage.getItem('username')}/> : null}
                {auth.loggedIn ? <Button onClick={handleClick} variant="success">Logout</Button> : null}
            </div>
        </Navbar>
    )
}