const API_URL = 'http://localhost:8081/gift_certificates';
const headers = new Headers({'Authorization': `Bearer ${localStorage.getItem('token')}`});

export async function getCertificates(number, size) {
    return await fetch(`${API_URL}?page=${number}&size=${size}`, {headers: headers});
}

export async function searchCertificatesApi(filter, number, size) {
    return await fetch(`${API_URL}?filter=${filter}&page=${number}&size=${size}`);
}