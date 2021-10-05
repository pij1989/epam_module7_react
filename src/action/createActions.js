import {
    ADD_TAG,
    ADD_TAGS,
    AUTH_ERROR,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    CERTIFICATES_ERROR,
    CHANGE_FILTER,
    CHANGE_IS_LOADED,
    CLEAR_CERTIFICATES_ERROR,
    DELETE_TAG,
    DELETE_TAGS,
    RECEIVE_CERTIFICATES,
    RECEIVE_CERTIFICATES_METADATA,
    SORT_BY_CREATE_DATE,
    SORT_BY_NAME
} from "./actionTypes";
import {
    createCertificateApi,
    createTagInGiftCertificateApi,
    searchCertificatesApi,
    sortCertificatesApi
} from "../services/certificate.service";
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
});

export const receiveCertificatesMetadata = (page, isLoaded) => ({
    type: RECEIVE_CERTIFICATES_METADATA,
    page: page,
    isLoaded: isLoaded
});

export const certificatesError = (isCertificatesError, errorMassage) => ({
    type: CERTIFICATES_ERROR,
    isCertificatesError: isCertificatesError,
    errorMassage: errorMassage
});

export const clearError = () => ({
    type: CLEAR_CERTIFICATES_ERROR,
    isCertificatesError: false,
    errorMassage: ''
});

export const changeIsLoaded = (isLoaded) => ({
    type: CHANGE_IS_LOADED,
    isLoaded: isLoaded
});

export const changeFilter = (filter) => ({
    type: CHANGE_FILTER,
    filter: filter
});

export const sortByCreateDate = (order) => ({
    type: SORT_BY_CREATE_DATE,
    sort: 'createDate',
    order: order
});

export const sortByName = (order) => ({
    type: SORT_BY_NAME,
    sort: 'name',
    order: order
});

export const fetchCertificates = (sort, order, number, size) => {
    return (dispatch) => {
        // handleFetchCertificates(getCertificates(number, size), dispatch);
        handleFetchCertificates(sortCertificatesApi(sort, order, number, size), dispatch);
    }
}

export const searchCertificates = (filter, number, size) => {
    return (dispatch) => {
        handleFetchCertificates(searchCertificatesApi(filter, number, size), dispatch);
    }
}

export const sortCertificates = (sort, order, number, size) => {
    return (dispatch) => {
        handleFetchCertificates(sortCertificatesApi(sort, order, number, size), dispatch);
    }
}

const handleFetchCertificates = (result, dispatch) => {
    result
        .then(response => {
            if (!checkAuth(response)) {
                dispatch(authLogout());
                return Promise.reject({status: response.status, statusText: response.statusText});
            }
            if (response.status < 200 || (response.status >= 300 && response.status !== 401)) {
                return response.json().then(data => {
                    let errorMessage = 'Error is occurred';
                    if (data.errorMessage) {
                        errorMessage = data.errorMessage;
                    }
                    console.log(data.errorMessage);
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText ? response.statusText : errorMessage
                    });
                });
            }
            return response.json();
        })
        .then(
            data => {
                console.log(data)
                let certificateList = data._embedded.giftCertificateModelList;
                dispatch(receiveCertificates(certificateList));
                dispatch(receiveCertificatesMetadata(data.page, true));
            },
            error => {
                if (error.status !== 401) {
                    dispatch(certificatesError(true, `${error.status} : ${error.statusText}`));
                    dispatch(changeIsLoaded(true));
                    setTimeout(() => {
                        dispatch(clearError())
                    }, 1000);
                }
            }
        )
}

export const addTag = (tag) => ({
    type: ADD_TAG,
    tag: tag
});

export const deleteTag = (index) => ({
    type: DELETE_TAG,
    index: index
})

export const addTags = (tags) => ({
    type: ADD_TAGS,
    tags: tags
})

export const deleteTags = () => ({
    type: DELETE_TAGS,
    tags: []
})


export const createCertificate = (certificate, tags) => {
    return (dispatch) => {
        createCertificateApi(certificate)
            .then(response => {
                return checkResponseStatus(response);
            })
            .then(
                data => {
                    console.log(data);
                    for (let tag of tags) {
                        createTagInGiftCertificateApi(data.id, {name: tag.text})
                            .then(response => {
                                return checkResponseStatus(response);
                            })
                            .then(
                                data => {
                                    console.log(data);
                                },
                                error => {
                                    console.log('ERROR: ' + error);
                                });
                    }
                },
                error => {
                    console.log('ERROR: ' + error);
                })
    }
}

const checkResponseStatus = (response) => {
    if (response.status === 201) {
        return response.json();
    }
    if (response.status === 403) {
        return Promise.reject('Accesses denied');
    }
    if (response.status === 401) {
        return Promise.reject('Unauthorized');
    }
    if (response.status === 400) {
        return Promise.reject('Bad request');
    }
}