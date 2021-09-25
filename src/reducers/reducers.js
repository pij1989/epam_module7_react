import {
    AUTH_ERROR,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    CERTIFICATES_ERROR,
    CHANGE_FILTER,
    CHANGE_IS_LOADED,
    CLEAR_CERTIFICATES_ERROR,
    RECEIVE_CERTIFICATES,
    RECEIVE_CERTIFICATES_METADATA
} from "../action/actionTypes";

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

export const certificatesReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_CERTIFICATES:
            return action.certificates
        default:
            return state;
    }
}

const initialStateCertificatesMetadata = {
    page: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        number: 1
    },
    filter: '',
    isLoaded: false
}

export const certificatesMetadataReducer = (state = initialStateCertificatesMetadata, action) => {
    switch (action.type) {
        case RECEIVE_CERTIFICATES_METADATA:
            return {
                ...state,
                page: {
                    size: action.page.size,
                    totalElements: action.page.totalElements,
                    totalPages: action.page.totalPages,
                    number: action.page.number + 1
                },
                isLoaded: action.isLoaded
            }
        case CHANGE_IS_LOADED:
            return {
                ...state,
                isLoaded: action.isLoaded
            }
        case CHANGE_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }
}

const initialStateCertificatesError = {
    isCertificatesError: false,
    errorMassage: ''
}

export const certificatesErrorReducer = (state = initialStateCertificatesError, action) => {
    switch (action.type) {
        case CERTIFICATES_ERROR:
            return {
                ...state,
                isCertificatesError: action.isCertificatesError,
                errorMassage: action.errorMassage
            }
        case CLEAR_CERTIFICATES_ERROR:
            return {
                ...state,
                isCertificatesError: action.isCertificatesError,
                errorMassage: action.errorMassage
            }
        default:
            return state;
    }
}