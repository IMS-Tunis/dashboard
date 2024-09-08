
function startCountdown(deadline) {
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = deadline - now;

        if (timeRemaining < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "Deadline has passed!";
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown(); // Initial call to display immediately
    const interval = setInterval(updateCountdown, 1000);
}

// Setting the deadline to Wednesday, September 4, 2024, 23:59:59
const nextDeadline = new Date("September 4, 2024 23:59:59").getTime();
startCountdown(nextDeadline);


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


// Function to handle Grade Submission (Frame 3)
// Function to handle Grade Submission (Frame 3)
function accessGradeSubmission() {
    const passcode = document.getElementById('report-passcode').value;

    if (passcode === "m1289") {
        // Admin passcode: Display all subject links
        const allSubjects = Object.keys(data.subjects_links);
        const results = allSubjects.map(subject => 
            `<tr>
                <td>${subject}</td>
                <td><a href="${data.subjects_links[subject]}" target="_blank">Click to Access</a></td>
            </tr>`).join("");

        localStorage.setItem('gradeResults', results);
        window.location.href = 'gradeSubmissionResults.html';
    } else if (data.passcodes[passcode]) {
        // Regular teacher: Display their assigned subjects
        const teacherSubjects = data.passcodes[passcode].subjects;
        const results = teacherSubjects.map(subject => 
            `<tr>
                <td>${subject}</td>
                <td><a href="${data.subjects_links[subject]}" target="_blank">Click to Access</a></td>
            </tr>`).join("");
        
        localStorage.setItem('gradeResults', results);
        window.location.href = 'gradeSubmissionResults.html';
    } else {
        alert("Invalid passcode. Please try again.");
    }
}

// Function to handle Report Cards (Frame 4)
function validateReportCardPasscode() {
    const passcode = document.getElementById('report-card-passcode').value;

    if (passcode === "m1289") {
        // Admin passcode: Display all report card links
        const allReportCards = Object.keys(data.reportCards_links);
        const results = allReportCards.map(report => 
            `<tr>
                <td>${report}</td>
                <td><a href="${data.reportCards_links[report]}" target="_blank">Click to Access</a></td>
            </tr>`).join("");

        localStorage.setItem('reportCardResults', results);
        window.location.href = 'ReportCardsResults.html';
    } else if (data.passcodes[passcode] && data.passcodes[passcode].homeroom) {
        // Regular homeroom teacher: Display their assigned report card
        const reportCardLink = data.reportCards_links[data.passcodes[passcode].homeroom];
        const result = `<tr><td>${data.passcodes[passcode].homeroom}</td><td><a href="${reportCardLink}" target="_blank">Click to Access</a></td></tr>`;
        localStorage.setItem('reportCardResults', result);
        window.location.href = 'ReportCardsResults.html';
    } else {
        alert("Invalid passcode or no homeroom assignment.");
    }
}

// Function to load results for Grade Submission
function loadGradeSubmissionResults() {
    const results = localStorage.getItem('gradeResults');
    if (results) {
        document.getElementById('grade-results').innerHTML = `<table>${results}</table>`;
    } else {
        document.getElementById('grade-results').innerHTML = "<p>No results found.</p>";
    }
}

// Function to load results for Report Cards
function loadReportCardResults() {
    const results = localStorage.getItem('reportCardResults');
    if (results) {
        document.getElementById('report-card-results').innerHTML = `<table>${results}</table>`;
    } else {
        document.getElementById('report-card-results').innerHTML = "<p>No results found.</p>";
    }
}


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
        if (passcode === "m1289") {
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


// Function to handle Disciplinary Actions frame
function accessDisciplinaryActions() {
    const passcode = document.getElementById('disciplinary-passcode').value;

    if (data.passcodes[passcode]) {
        // Show the disciplinary links once the passcode is validated
        document.getElementById('disciplinary-links').style.display = 'block';

        // Set the href for the LAC and Charguia buttons
        document.getElementById('lac-link').onclick = function() {
            window.open(data.links["disciplinary_lac"], '_blank');
        };

        document.getElementById('charguia-link').onclick = function() {
            window.open(data.links["disciplinary_charguia"], '_blank');
        };
    } else {
        alert("Incorrect passcode.");
    }
}

