const apiUrl = 'http://localhost:3000/v1/';
const token = '6eb6f069523055a339d71e5b1f6c88cc';

function makeApiRequest(endpoint, method, data = {}) {
    let url = apiUrl + endpoint;
    const headers = {
        'token': token,
        'Content-Type': 'application/json', // Required for POST requests
    };

    const options = {
        method: method,
        headers: headers,
    };

    if (method === 'POST') {
        options.body = JSON.stringify(data); // Send data in body for POST
    } else if (method === 'GET') {
        url = buildUrl(endpoint, data); // Use buildUrl for GET params
    }

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error); // Log error for debugging
            return { error: error.message };
        });
}

function handleApiResult(result) {
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (result.error) {
        errorMessage.textContent = 'Error: ' + result.error;
        successMessage.textContent = '';
    } else {
        successMessage.textContent = 'Success: ' + JSON.stringify(result);
        errorMessage.textContent = '';
    }
}

function userRegistration() {
    const registrationData = {
        user_name: 'lnrguser',
        user_password: '123456',
        user_email: 'info@lnrg.technology',
        user_tel: '35790000000',
        user_country: 'Cyprus',
        user_type: 1,
    };

    makeApiRequest('user/user_register', 'POST', registrationData)
        .then(result => handleApiResult(result));
}

function userCheck() {
    const updateData = {
        user_name: 'admin',
    };

    makeApiRequest('user/check_user', 'POST', updateData)
        .then(result => handleApiResult(result));
}

function userUpdate() {
    const updateData = {
        c_user_id: 3,
        mobile: '35790000000',
    };

    makeApiRequest('user/modify', 'POST', updateData)
        .then(result => handleApiResult(result));
}

function getPowerStationsList() {
    const listParams = {
        user_name: 'admin',
        c_user_id: 1,
        search_type: 'PlantName',
        search_keyword: 'test',
        page: 1,
        perpage: 10,
    };

    makeApiRequest('plant/list', 'GET', listParams)
        .then(result => handleApiResult(result));
}

function getPowerStationData() {
    const listParams = {
        c_user_id: 2,
        search_type: 'PlantName',
        search_keyword: 'test',
        page: 1,
        perpage: 10,
    };

    makeApiRequest('plant/details', 'GET', listParams)
        .then(result => handleApiResult(result));
}

// Helper function to build URL with parameters
function buildUrl(endpoint, params) {
    const url = new URL(apiUrl + endpoint);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url.toString();
}