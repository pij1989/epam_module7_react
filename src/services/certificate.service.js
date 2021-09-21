const API_URL = 'http://localhost:8081/gift_certificates';

export async function getCertificates() {
    const headers = new Headers({'Authorization': `Bearer ${localStorage.getItem('token')}`});
    return await fetch(API_URL, {headers: headers});
}