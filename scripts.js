// Function to handle Attendance frame
function accessAttendance() {
    const year = document.getElementById('attendance-year').value;
    if (year) {
        window.open(data.links[year], '_blank'); // Always open in a new tab
    } else {
        alert("Please select a year.");
    }
}

// Function to handle Weekly Reports frame
function openWeeklyReport(reportType) {
    const link = data.links[reportType.toLowerCase()];
    if (link) {
        window.open(link, '_blank'); // Always open in a new tab
    } else {
        alert("Report not found.");
    }
}

// Function to handle Grade Submission frame
function accessGradeSubmission() {
    const passcode = document.getElementById('grade-passcode').value;

    if (data.passcodes[passcode]) {
        let subjects = [];

        if (passcode === "admin") {
            // Admin gets all subjects (all keys from the links object)
            subjects = Object.keys(data.links).filter(key => key.includes('_'));
        } else {
            // Regular user gets their own subjects
            subjects = data.passcodes[passcode].subjects;
        }

        const results = subjects.map(subject => 
            `<tr>
                <td>${subject}</td>
                <td><a href="${data.links[subject]}" target="_blank">Click to Access</a></td>
            </tr>`).join("");
        
        localStorage.setItem('results', results);
        localStorage.setItem('teacherName', data.passcodes[passcode].name);
        window.location.href = 'results.html';
    } else {
        alert("Incorrect passcode.");
    }
}


function loadResults() {
    const results = localStorage.getItem('results');
    const teacherName = localStorage.getItem('teacherName');
    if (results) {
        document.getElementById('results-list').innerHTML = `
            <h2>Links for ${teacherName}:</h2>
            <table>${results}</table>`;
    } else {
        document.getElementById('results-list').innerHTML = "<p>No results found.</p>";
    }
}
