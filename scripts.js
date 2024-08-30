
// Function to handle Attendance frame
function accessAttendance() {
    const year = document.getElementById('attendance-year').value;
    if (year) {
        window.open(data.attendance_links[year], '_blank'); // Always open in a new tab
    } else {
        alert("Please select a year.");
    }
}

function validateAndOpenReport(reportType) {
    const passcode = document.getElementById('weekly-passcode').value;

    // Check if the passcode exists in data.js
    if (data.passcodes[passcode]) {
        // If passcode is valid, open the report
        openWeeklyReport(reportType);
    } else {
        // If passcode is invalid, show an alert denying access
        alert("Invalid passcode. Please try again.");
    }
}

function openWeeklyReport(reportType) {
    const link = data.links[reportType.toLowerCase()];
    if (link) {
        window.open(link, '_blank'); // Always open in a new tab
    } else {
        alert("Report not found.");
    }
}


function accessGradeSubmission() {
    const passcode = document.getElementById('report-passcode').value;

    // Check if the passcode exists in data.js
    if (data.passcodes[passcode]) {
        // If passcode is valid, redirect to gradeSubmissionResults.html
        window.location.href = 'gradeSubmissionResults.html';
    } else {
        // If passcode is invalid, show an alert denying access
        alert("Invalid passcode. Please try again.");
    }
}

/*
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
*/

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

function validateReportCardPasscode() {
    const passcode = document.getElementById('report-card-passcode').value;

    // Check if the passcode exists in data.js
    if (data.passcodes[passcode]) {
        // If passcode is valid, redirect to ReportCardsResults.html
        window.location.href = 'ReportCardsResults.html';
    } else {
        // If passcode is invalid, show an alert denying access
        alert("Invalid passcode. Please try again.");
    }
}

/*
function accessReportCards() {
    const passcode = document.getElementById('report-card-passcode').value;

    if (data.passcodes[passcode]) {
        if (passcode === "admin") {
            // Admin sees all report card links
            const reportCards = Object.keys(data.links).filter(key => key.startsWith('report_card_'));
            const results = reportCards.map(card => 
                `<tr>
                    <td>${card.replace('report_card_', 'Year ')}</td>
                    <td><a href="${data.links[card]}" target="_blank">Click to Access</a></td>
                </tr>`).join("");
            localStorage.setItem('results', results);
            localStorage.setItem('teacherName', data.passcodes[passcode].name);
            window.location.href = 'results.html';
        } else if (data.passcodes[passcode].homeroom) {
            // Homeroom teacher is directed to their specific report card
            const homeroomLink = data.links[data.passcodes[passcode].homeroom];
            window.open(homeroomLink, '_blank');
        } else {
            alert("You do not have access to any report cards.");
        }
    } else {
        alert("Incorrect passcode.");
    }
}
*/


function validateStudentListPasscode() {
    const passcode = document.getElementById('student-list-passcode').value;

    // Check if the passcode exists in data.js
    if (data.passcodes[passcode]) {
        // If passcode is valid, open the student list link
        window.open(data.links["student_lists"], '_blank');
    } else {
        // If passcode is invalid, show an alert denying access
        alert("Invalid passcode. Please try again.");
    }
}



// Function to handle School Database frame
function accessDatabase() {
    const passcode = document.getElementById('database-passcode').value;

    if (data.passcodes[passcode]) {
        if (data.passcodes[passcode].role === "admin_officer" || data.passcodes[passcode].role === "admin") {
            const databaseLink = data.links["school_database"];
            window.open(databaseLink, '_blank');
        } else {
            alert("You do not have access to the school database.");
        }
    } else {
        alert("Incorrect passcode.");
    }
}

// Function to handle Pedagogic Resources Workspace (Frame 7)
function accessWorkspace() {
    const passcode = document.getElementById('workspace-passcode').value;

    if (data.passcodes[passcode]) {
        if (passcode === "admin") {
            // Admin sees all workspace links
            const workspaceKeys = Object.keys(data.links).filter(key => key.startsWith('workspace_'));
            const results = workspaceKeys.map(ws => {
                const teacherPasscode = ws.replace('workspace_', '');
                const teacherData = data.passcodes[teacherPasscode];

                return `<tr>
                    <td>${teacherData ? teacherData.name : 'Unknown'}</td>
                    <td>${teacherPasscode}</td>
                    <td><a href="${data.links[ws]}" target="_blank" class="link-button">Access teacher folder from here</a></td>
                </tr>`;
            }).join("");

            localStorage.setItem('results', results);
            window.location.href = 'results.html';
        } else if (data.passcodes[passcode].workspace) {
            // Teacher is directed directly to their specific workspace link
            const workspaceLink = data.links[data.passcodes[passcode].workspace];
            window.open(workspaceLink, '_blank');
        } else {
            alert("You do not have access to a workspace.");
        }
    } else {
        alert("Incorrect passcode.");
    }
}




// Function to handle Disciplinary Actions (Frame 8)
function openDisciplinaryLink(linkType) {
    const link = data.links[`disciplinary_${linkType.toLowerCase()}`];
    window.open(link, '_blank');
}
