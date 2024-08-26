function validatePasscode() {
    const passcode = document.getElementById('passcode').value;
    
    fetch('passcodes.json')
        .then(response => response.json())
        .then(data => {
            const user = data.teachers.find(t => t.passcode === passcode);
            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = 'results.html';
            } else {
                alert('Invalid passcode');
            }
        })
        .catch(error => console.error('Error:', error));
}
