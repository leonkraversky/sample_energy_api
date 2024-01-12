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
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        handleApiSuccess(data);
    })
    .catch(error => {
        handleApiError(error.message);
    });
}

function handleApiSuccess(data) {
    // Add visual indication for success (e.g., change button color, display success message)
    console.log('Success:', data);
    alert('API request successful!');
}

function handleApiError(errorMessage) {
    // Add visual indication for error (e.g., change button color, display error message)
    console.error('Error:', errorMessage);
    alert('API request failed. Please try again.');
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
