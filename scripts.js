function testFetch() {
    fetch('passcodes.json')
        .then(response => {
            if (!response.ok) {
                alert("Failed to load passcodes.json");
                throw new Error("Failed to load passcodes.json");
            }
            return response.json();
        })
        .then(passcodes => {
            alert("Fetched passcodes: " + JSON.stringify(passcodes));
        })
        .catch(error => {
            console.error('Error fetching passcodes:', error);
            alert('Error: ' + error.message);
        });
}
