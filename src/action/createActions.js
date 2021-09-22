import {
    AUTH_ERROR,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    RECEIVE_CERTIFICATE_TAGS,
    RECEIVE_CERTIFICATES,
    RECEIVE_CERTIFICATES_METADATA
} from "./actionTypes";
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

export const receiveCertificatesMetadata = (page, links, isLoaded) => ({
    type: RECEIVE_CERTIFICATES_METADATA,
    page: page,
    links: links,
    isLoaded: isLoaded
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
                    let certificateList = data._embedded.giftCertificateModelList;
                    dispatch(receiveCertificates(certificateList));
                    dispatch(receiveCertificatesMetadata(data.page, data._links, true));
                },
                error => {
                    if (error.status !== 401) {
                        console.log(`${error.status} : ${error.statusText}`);
                    }
                }
            )
    }
}