import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR} from "./actionTypes";

export const authLogin = (loggedIn, user) => ({
    type: AUTH_LOGIN,
    loggedIn: loggedIn,
    user: user
});

export const authLogout = () => ({
    type: AUTH_LOGOUT,
    loggedIn: false,
    user: {}
});

export const authError = (isAuthError, errorMassage) => ({
    type: AUTH_ERROR,
    isAuthError: isAuthError,
    errorMassage: errorMassage
});