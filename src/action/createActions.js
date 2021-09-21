import {AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT, RECEIVE_CERTIFICATES} from "./actionTypes";
import {getCertificates} from "../services/certificate.service";
import {checkAuth} from "../services/auth.service";

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

export const receiveCertificates = (certificates) => ({
    type: RECEIVE_CERTIFICATES,
    certificates: certificates
})

export const fetchCertificates = () => {
    return (dispatch) => {
        getCertificates()
            .then(response => {
                if (!checkAuth(response)) {
                    dispatch(authLogout());
                    return Promise.reject({status: response.status, statusText: response.statusText});
                }
                if (response.status < 200 || (response.status >= 300 && response.status !== 401)) {
                    return Promise.reject({status: response.status, statusText: response.statusText});
                }
                return response.json();
            })
            .then(
                data => {
                    console.log(data)
                    dispatch(receiveCertificates(data._embedded.giftCertificateModelList));
                },
                error => {
                    if (error.status !== 401) {
                        console.log(`${error.status} : ${error.statusText}`);

                    }
                }
            )
    }
}