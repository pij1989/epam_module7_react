const API_URL_CERTIFICATES = 'http://localhost:8081/gift_certificates';

export async function getCertificates(number, size) {
    return await fetch(`${API_URL_CERTIFICATES}?page=${number}&size=${size}`);
}

export async function searchCertificatesApi(filter, number, size) {
    return await fetch(`${API_URL_CERTIFICATES}?filter=${filter}&page=${number}&size=${size}`);
}

export async function sortCertificatesApi(sort, order, number, size) {
    return await fetch(`${API_URL_CERTIFICATES}?sort=${sort}&order=${order}&page=${number}&size=${size}`);
}

export async function createCertificateApi(certificate) {
    return await fetch(`${API_URL_CERTIFICATES}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        method: 'POST',
        body: JSON.stringify(certificate)
    })
}

export async function createTagInGiftCertificateApi(id, tag) {
    return await fetch(`${API_URL_CERTIFICATES}/${id}/tags`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        method: 'POST',
        body: JSON.stringify(tag)
    })
}

export async function deleteCertificateApi(id) {
    return await fetch(`${API_URL_CERTIFICATES}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        method: 'DELETE'
    })
}

export async function fetchCertificateByIdApi(id) {
    return await fetch(`${API_URL_CERTIFICATES}/${id}`);
}