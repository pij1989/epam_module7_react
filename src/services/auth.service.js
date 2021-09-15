const API_URL = 'http://localhost:8081/';

export const login = (username, password) => {
    fetch(API_URL + 'login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    })
        .then(response => {
            if (response.status === 200) {
                response.json()
                    .then(data => localStorage.setItem('token', data['token']));
            } else {
                console.log(`Status: ${response.status}`);
                response.json()
                    .then(data => console.log(data));
            }
        })
        .catch(error => console.log(error));
}