// Function to access attendance based on the selected year
function accessAttendance() {
    const year = document.getElementById('attendance-year').value;
    const url = getLink(`attendance_sheet_${year}`);
    if (url) {
        window.open(url, '_blank');
    } else {
        alert('Attendance sheet not available for the selected year.');
    }
}

// Function to access weekly reports
function accessWeeklyReports(type) {
    const url = type === 'lac' ? getLink('weekly_reports_link') : getLink('charguia_weekly_reports_link');
    if (url) {
        window.open(url, '_blank');
    } else {
        alert('Weekly report not available.');
    }
}

// Function to submit grades
function submitGrades() {
    const passcode = document.getElementById('grade-passcode').value;
    validatePasscodeAndRedirect(passcode, 'grade');
}

// Function to access report cards
function accessReportCards() {
    const passcode = document.getElementById('report-passcode').value;
    validatePasscodeAndRedirect(passcode, 'report');
}

// Function to access student lists
function accessStudentLists() {
    const url = getLink('student_lists_link');
    if (url) {
        window.open(url, '_blank');
    } else {
        alert('Student list not available.');
    }
}

// Function to access the school database
function accessDatabase() {
    const passcode = document.getElementById('database-passcode').value;
    validatePasscodeAndRedirect(passcode, 'database');
}

// Function to access pedagogic resources
function accessPedagogic() {
    const passcode = document.getElementById('pedagogic-passcode').value;
    validatePasscodeAndRedirect(passcode, 'pedagogic');
}

// Function to validate passcode and redirect to results.html with appropriate links
function validatePasscodeAndRedirect(passcode, type) {
    fetch('passcodes.json')
        .then(response => response.json())
        .then(passcodes => {
            const user = passcodes.teachers.find(t => t.passcode === passcode);
            if (user) {
                let links = [];
                switch (type) {
                    case 'grade':
                        links = getGradeLinks(user);
                        break;
                    case 'report':
                        links = getReportLinks(user);
                        break;
                    case 'database':
                        links = getDatabaseLinks(user);
                        break;
                    case 'pedagogic':
                        links = getPedagogicLinks(user);
                        break;
                }
                if (links.length > 0) {
                    sessionStorage.setItem('links', JSON.stringify(links));
                    window.location.href = 'results.html';
                } else {
                    alert('No links available for this passcode.');
                }
            } else {
                sessionStorage.setItem('error', 'Invalid passcode.');
                window.location.href = 'results.html';
            }
        });
}

// Function to get the appropriate link from the JSON file
function getLink(linkKey) {
    return fetch('links.json')
        .then(response => response.json())
        .then(links => links[linkKey] || null);
}

// Function to get grade submission links for a teacher
function getGradeLinks(user) {
    const links = [];
    user.years.forEach(year => {
        user.subjects.forEach(subject => {
            const linkKey = `${year}_${subject}_link`;
            getLink(linkKey).then(url => {
                if (url) {
                    links.push(url);
                }
            });
        });
    });
    return links;
}

// Function to get report card links for a homeroom teacher
function getReportLinks(user) {
    const links = [];
    user.years.forEach(year => {
        const linkKey = `report_cards_link_${year}`;
        getLink(linkKey).then(url => {
            if (url) {
                links.push(url);
            }
        });
    });
    return links;
}

// Function to get database link for admin officers
function getDatabaseLinks(user) {
    const links = [];
    if (user.admin) {
        getLink('school_database_link_admin').then(url => {
            if (url) {
                links.push(url);
            }
        });
    }
    return links;
}

// Function to get pedagogic resource links for a teacher
function getPedagogicLinks(user) {
    const links = [];
    if (user.pedagogic_link) {
        links.push(user.pedagogic_link);
    }
    return links;
}
