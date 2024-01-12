const apiUrl = 'http://test.growatt.com/v1/';
const token = '6eb6f069523055a339d71e5b1f6c88cc';

function makeApiRequest(endpoint, method, data = {}) {
    const url = apiUrl + endpoint;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    };

    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
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

    makeApiRequest('user/user_register', 'POST', registrationData);
}

function userUpdate() {
    const updateData = {
        c_user_id: 3,
        mobile: '35790000000',
    };

    makeApiRequest('user/modify', 'POST', updateData);
}

function getPowerStationsList() {
    const listParams = {
        C_user_id: 1,
        search_type: 'PlantName',
        search_keyword: 'test',
        page: 1,
        perpage: 10,
    };

    makeApiRequest('plant/list', 'GET', listParams);
}

function getPowerStationData() {
    // Add implementation for getting power station data
}

