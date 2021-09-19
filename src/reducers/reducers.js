import {AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT} from "../action/actionTypes";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                loggedIn: action.loggedIn,
                user: action.user
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                loggedIn: action.loggedIn,
                user: action.user
            }
        default:
            return state;
    }
}

export const authErrorReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_ERROR:
            return {
                ...state,
                isAuthError: action.isAuthError,
                errorMassage: action.errorMassage
            }
        default:
            return state;
    }

}