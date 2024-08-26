function validatePasscode() {
    const passcode = document.getElementById('grade-passcode').value;

    fetch('passcodes.json')
        .then(response => response.json())
        .then(passcodes => {
            if (passcodes[passcode]) {
                // Store the user information in sessionStorage
                sessionStorage.setItem('user', JSON.stringify({ name: passcodes[passcode], passcode: passcode }));
                // Redirect to results.html
                window.location.href = 'results.html';
            } else {
                alert("Invalid passcode");
            }
        })
        .catch(error => console.error('Error fetching passcodes:', error));
}
