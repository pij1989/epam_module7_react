import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import "./Login.css"
import {login} from "../services/auth.service"
import ErrorAuth from "./ErrorAuth";
import {Redirect} from "react-router-dom";
import {Formik} from "formik";
import * as yup from "yup";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const {handleAuthError, authError} = props;

    const handleChangeUsername = (event) => {
        let username = event.target.value;
        console.log(`Username: ${username}`);
        setUserName(username);
    }

    const handleChangePassword = (event) => {
        let password = event.target.value;
        console.log(`Password: ${password}`);
        setPassword(password);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        login(username, password)
            .then(
                user => {
                    props.handleAuthLogin(true, {username: user.username, role: user.role});
                    console.log(props.auth)
                },
                message => {
                    console.log(message);
                    props.handleAuthError(true, message);
                });
    }

    useEffect(() => {
        setTimeout(() => {
            handleAuthError(false, '');
        }, 1000)
    }, [authError.isAuthError])

    if (props.auth.loggedIn) {
        return <Redirect to="/home"/>;
    }

    const validationSchema = yup.object().shape({
        username: yup.string().max(30, 'Username field length must not be greater than 30 characters').min(3, 'Username field length must not be less than 3 characters').required(),
        password: yup.string().required()
    });

    return (
        <div className="Login">
            <div className="Login-title">Login</div>

            <Formik
                validationSchema={validationSchema}
                onSubmit={values => {
                    console.log(values);
                    login(values.username, values.password)
                        .then(
                            user => {
                                props.handleAuthLogin(true, {username: user.username, role: user.role});
                                console.log(props.auth)
                            },
                            message => {
                                console.log(message);
                                props.handleAuthError(true, message);
                            });
                }}
                initialValues={{
                    username: '',
                    password: ''
                }}
            >
                {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors,
                  }) => (
                    <Form onSubmit={handleSubmit} className="d-flex flex-column">
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter username"
                                          name="username"
                                          value={values.username}
                                          onChange={handleChange}/>
                            <Form.Text className="text-muted">
                                Username sample: 'Ivan'
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Enter password"
                                          name="password"
                                          value={values.password}
                                          onChange={handleChange}/>
                            <Form.Text className="text-muted">
                                Password should be more then 8 and less then 40 symbol
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="Login-button">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
            {authError.isAuthError ? <ErrorAuth message={authError.errorMassage}/> : null}
        </div>
    )
}