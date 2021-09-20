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
            <div>
                <Navbar.Brand href="#home">Admin UI</Navbar.Brand>
            </div>
            <div className="d-flex justify-content-end">
                {localStorage.getItem('username') ? <div style={{color:'white'}}>{localStorage.getItem('username')}</div> : null}
                {auth.loggedIn ? <Button onClick={handleClick} variant="success">Logout</Button> : null}
            </div>
        </Navbar>
    )
}