const API_URL = 'http://localhost:8081/gift_certificates';

export const getCertificates = (setCertificates) => {
    const headers = new Headers({'Authorization': `Bearer ${localStorage.getItem('token')}`});
    fetch(API_URL, {
        headers: headers
    })
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                console.log(response.statusText)
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setCertificates(data);
        })
}