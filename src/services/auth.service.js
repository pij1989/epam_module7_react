const API_URL = 'http://localhost:8081/';

export async function login(username, password) {
    let response = await fetch(API_URL + 'login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });
    if (response.status < 200 || (response.status >= 300 && response.status !== 401)) {
        throw new Error(response.statusText);
    }
    if (response.status === 200) {
        let data = await response.json();
        const role = data.role;
        const username = data.username;
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username);
        return Promise.resolve({username: username, role: role})
    }
    if (response.status === 401) {
        let data = await response.json();
        return Promise.reject(data.errorMessage);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
}

export const checkAuth = (response) => {
    if (response.status === 401) {
        logout();
        return false;
    }
    return true;
}

/*
export const login = (username, password) => {
    let user;
    let permission;
    fetch(API_URL + 'login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    })
        .then(response => {
            if (response.status < 200 || (response.status >= 300 && response.status !== 401)) {
                throw new Error(response.statusText);
            }
            if (response.status === 200) {
                response.json()
                    .then(data => {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('role', data.role);
                        localStorage.setItem('username', data.username);
                        user = data.username;
                        permission = data.role;
                    });
            }
            if (response.status === 401) {
                response.json()
                    .then(data => console.log(data));
            }
        })
        .catch(error => console.log(error));

    console.log(`User: ${user}, permission: ${permission}`)
}*/
