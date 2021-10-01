import React, {useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import TagsContainer from "../containers/TagsContainer";
import {Formik} from "formik";
import * as yup from "yup";

const AddCertificate = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validationSchema = yup.object().shape({
        name: yup.string()
            .max(30, 'Title field length must not be greater than 30 characters')
            .min(6, 'Title field length must not be less than 6 characters')
            .required(),
        description: yup.string()
            .max(1000, 'Description field length must not be greater than 1000 characters')
            .min(12, 'Description field length must not be less than 12 characters')
            .required(),
        duration: yup.number().required(),
        price: yup.number().moreThan(0).required(),
        tag: yup.string()
            .max(15, 'Tag field length must not be greater than 15 characters')
            .min(3, 'Tag field length must not be less than 3 characters')
    });

    return (
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
                    <Formik
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            console.log(values);
                        }}
                        initialValues={{
                            name: '',
                            description: '',
                            duration: '',
                            price: '',
                            tag: ''
                        }}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              values,
                              errors,
                          }) => (<Form noValidate onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="title">
                                <Form.Label column sm="2">
                                    Title
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="description">
                                <Form.Label column sm="2">
                                    Description
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        as="textarea" rows={5}
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="duration">
                                <Form.Label column sm="2">
                                    Duration
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        placeholder="Duration"
                                        name="duration"
                                        value={values.duration}
                                        onChange={handleChange}
                                        isInvalid={!!errors.duration}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.duration}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="price">
                                <Form.Label column sm="2">
                                    Price
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        placeholder="Price"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        isInvalid={!!errors.price}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="tags">
                                <Form.Label column sm="2">
                                    AddTags
                                </Form.Label>
                                <Col sm="10">
                                    <TagsContainer handleChange={handleChange} values={values} errors={errors}/>
                                </Col>
                            </Form.Group>

                            <div className="d-flex align-items-center justify-content-center">
                                <Button className="mx-2" variant="primary" type="submit">
                                    Save
                                </Button>
                                <Button className="mx-2" variant="secondary">
                                    Cancel
                                </Button>
                            </div>

                        </Form>)}
                    </Formik>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddCertificate;