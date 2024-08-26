function validatePasscode() {
    const passcode = document.getElementById('passcode').value;

    fetch('passcodes.json')
        .then(response => response.json())
        .then(passcodesData => {
            const user = passcodesData.teachers.find(t => t.passcode === passcode);
            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = 'results.html';
            } else {
                alert('Invalid passcode');
            }
        })
        .catch(error => console.error('Error fetching passcodes:', error));
}

function loadResults() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
        document.getElementById('links').innerHTML = '<p>No passcode provided or invalid passcode.</p>';
        return;
    }

    fetch('links.json')
        .then(response => response.json())
        .then(linksData => {
            let linksHTML = `<p>Welcome, ${user.name}</p><ul>`;

            if (user.years) {
                user.years.forEach(year => {
                    const attendanceLink = linksData.attendance_links[`year${year}`];
                    if (attendanceLink) {
                        linksHTML += `<li><a href="${attendanceLink}" target="_blank">Attendance for Year ${year}</a></li>`;
                    }

                    user.subjects.forEach(subject => {
                        const gradeLink = linksData.grade_submission_links[`year${year}_${subject}`];
                        if (gradeLink) {
                            linksHTML += `<li><a href="${gradeLink}" target="_blank">Grade Submission for Year ${year} - ${subject}</a></li>`;
                        }
                    });

                    const reportCardLink = linksData.report_cards_links[`year${year}`];
                    if (reportCardLink) {
                        linksHTML += `<li><a href="${reportCardLink}" target="_blank">Report Card for Year ${year}</a></li>`;
                    }
                });
            }

            const pedagogicLink = linksData.pedagogic_links[user.name.toLowerCase().replace(" ", "")];
            if (pedagogicLink) {
                linksHTML += `<li><a href="${pedagogicLink}" target="_blank">Pedagogic Resources</a></li>`;
            }

            if (user.admin) {
                Object.keys(linksData.pedagogic_links).forEach(key => {
                    linksHTML += `<li><a href="${linksData.pedagogic_links[key]}" target="_blank">Pedagogic Resources for ${key}</a></li>`;
                });
            }

            linksHTML += '</ul>';
            document.getElementById('links').innerHTML = linksHTML;
        })
        .catch(error => console.error('Error fetching links:', error));
}
