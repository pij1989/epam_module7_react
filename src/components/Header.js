import React from "react";
import {Button, Navbar} from "react-bootstrap";
import "./Header.css"
import {useDispatch, useSelector} from "react-redux";
import {authLogout} from "../action/createActions";
import {logout} from "../services/auth.service";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleClick = () => {
        logout();
        dispatch(authLogout());
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="Header justify-content-between px-4">
            <Navbar.Brand href="#home">Admin UI</Navbar.Brand>
            {auth.loggedIn ? <Button onClick={handleClick} variant="success">Logout</Button> : null}
        </Navbar>
    )
}