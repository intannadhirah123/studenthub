/* ==========================================================
   StudentHub - Main JavaScript
   Course: CDIM262
   Handles: sample data, login, register, session, logout,
            table rendering, search and dashboard charts.
   ========================================================== */

"use strict";


/* ---------- 1. SETTINGS ---------- */
// Names used to save data in the browser
const SESSION_KEY = "studenthub_session";   // who is logged in
const USERS_KEY   = "studenthub_users";     // users created on the register page

// Simulated login (no database needed)
const DEMO_USER = {
    username: "admin",
    password: "admin123",
    fullName: "Administrator"
};


/* ---------- 2. SAMPLE DATA ---------- */
// Courses offered by the (fictional) university
const courses = [
    { code: "CS101",   name: "Introduction to Programming",     lecturer: "Dr. Aisha Rahman",    credits: 4, capacity: 40 },
    { code: "IT201",   name: "Database Systems",                lecturer: "Mr. Daniel Lim",      credits: 3, capacity: 35 },
    { code: "CDIM262", name: "Advanced Web Design and CMS",     lecturer: "Ms. Priya Nair",      credits: 3, capacity: 30 },
    { code: "NET210",  name: "Computer Networks",               lecturer: "Dr. Hafiz Ismail",    credits: 3, capacity: 30 },
    { code: "SE301",   name: "Software Engineering",            lecturer: "Dr. Wong Mei Ling",   credits: 4, capacity: 30 },
    { code: "AI305",   name: "Introduction to AI",              lecturer: "Prof. Ahmad Zulkifli", credits: 3, capacity: 25 },
    { code: "CYB220",  name: "Cybersecurity Fundamentals",      lecturer: "Ms. Siti Noraini",    credits: 3, capacity: 30 },
    { code: "MM230",   name: "Multimedia Design",               lecturer: "Mr. Kevin Tan",       credits: 3, capacity: 25 }
];

// Students. "course" must match a course code above.
const students = [
    { id: "STU001", name: "Nur Aisyah Binti Ahmad",     email: "aisyah.ahmad@studenthub.edu.my",  course: "CS101",   year: 1, gpa: 3.82, status: "Active" },
    { id: "STU002", name: "Lim Wei Jie",                email: "weijie.lim@studenthub.edu.my",    course: "CDIM262", year: 2, gpa: 3.45, status: "Active" },
    { id: "STU003", name: "Priya Devi Subramaniam",     email: "priya.devi@studenthub.edu.my",    course: "IT201",   year: 2, gpa: 3.67, status: "Active" },
    { id: "STU004", name: "Muhammad Haziq Bin Roslan",  email: "haziq.roslan@studenthub.edu.my",  course: "NET210",  year: 3, gpa: 2.85, status: "Active" },
    { id: "STU005", name: "Tan Mei Xin",                email: "meixin.tan@studenthub.edu.my",    course: "SE301",   year: 3, gpa: 3.91, status: "Active" },
    { id: "STU006", name: "Arjun Kumar",                email: "arjun.kumar@studenthub.edu.my",   course: "AI305",   year: 3, gpa: 3.28, status: "On Leave" },
    { id: "STU007", name: "Siti Nurhaliza Binti Omar",  email: "nurhaliza.omar@studenthub.edu.my", course: "CDIM262", year: 2, gpa: 3.55, status: "Active" },
    { id: "STU008", name: "Chong Jia Hao",              email: "jiahao.chong@studenthub.edu.my",  course: "CYB220",  year: 2, gpa: 2.45, status: "Probation" },
    { id: "STU009", name: "Farah Amira Binti Yusof",    email: "farah.yusof@studenthub.edu.my",   course: "MM230",   year: 1, gpa: 3.12, status: "Active" },
    { id: "STU010", name: "Daniel Raj",                 email: "daniel.raj@studenthub.edu.my",    course: "CS101",   year: 1, gpa: 3.40, status: "Active" },
    { id: "STU011", name: "Ng Shu Ting",                email: "shuting.ng@studenthub.edu.my",    course: "CDIM262", year: 2, gpa: 3.74, status: "Active" },
    { id: "STU012", name: "Ahmad Danial Bin Kamal",     email: "danial.kamal@studenthub.edu.my",  course: "IT201",   year: 2, gpa: 2.98, status: "Active" },
    { id: "STU013", name: "Kavitha Nair",               email: "kavitha.nair@studenthub.edu.my",  course: "SE301",   year: 3, gpa: 3.60, status: "Active" },
    { id: "STU014", name: "Ong Zhi Yuan",               email: "zhiyuan.ong@studenthub.edu.my",   course: "NET210",  year: 3, gpa: 2.30, status: "Probation" },
    { id: "STU015", name: "Nurul Izzah Binti Hassan",   email: "izzah.hassan@studenthub.edu.my",  course: "CYB220",  year: 2, gpa: 3.35, status: "Active" },
    { id: "STU016", name: "Lee Jun Kai",                email: "junkai.lee@studenthub.edu.my",    course: "AI305",   year: 3, gpa: 3.05, status: "Active" }
];


/* ---------- 3. SMALL HELPER FUNCTIONS ---------- */

// Show a Bootstrap alert inside the element with the given id
function showAlert(elementId, message, type) {
    const box = document.getElementById(elementId);
    if (!box) return;
    box.className = "alert alert-" + type;   // e.g. "alert alert-danger"
    box.textContent = message;
}

// Count how many students belong to one course
function countStudentsInCourse(courseCode) {
    return students.filter(function (s) { return s.course === courseCode; }).length;
}

// Average GPA of all students, shown with 2 decimals
function getAverageGpa() {
    const total = students.reduce(function (sum, s) { return sum + s.gpa; }, 0);
    return (total / students.length).toFixed(2);
}

// Choose a Bootstrap badge colour for each student status
function getStatusBadge(status) {
    if (status === "Active")    return '<span class="badge bg-success">Active</span>';
    if (status === "On Leave")  return '<span class="badge bg-warning text-dark">On Leave</span>';
    return '<span class="badge bg-danger">' + status + '</span>';
}


/* ---------- 4. AUTHENTICATION ---------- */

// Get the list of users created on the register page
function getRegisteredUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (error) {
        return [];
    }
}

// Save who is logged in (sessionStorage is cleared when the tab closes)
function saveSession(username, fullName) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: username, fullName: fullName }));
}

// Read the current session (returns null if nobody is logged in)
function getSession() {
    try {
        return JSON.parse(sessionStorage.getItem(SESSION_KEY));
    } catch (error) {
        return null;
    }
}

// Handle the login form
function handleLogin(event) {
    event.preventDefault();   // stop the page from reloading

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // 1. Check for empty fields
    if (username === "" || password === "") {
        showAlert("loginAlert", "Please enter both username and password.", "warning");
        return;
    }

    // 2. Check the simulated admin account
    if (username.toLowerCase() === DEMO_USER.username && password === DEMO_USER.password) {
        saveSession(DEMO_USER.username, DEMO_USER.fullName);
        window.location.href = "dashboard.html";
        return;
    }

    // 3. Check accounts created on the register page
    const found = getRegisteredUsers().find(function (u) {
        return u.username.toLowerCase() === username.toLowerCase() && u.password === password;
    });

    if (found) {
        saveSession(found.username, found.fullName);
        window.location.href = "dashboard.html";
    } else {
        showAlert("loginAlert", "Invalid username or password. Please try again.", "danger");
    }
}

// Handle the register form
function handleRegister(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email    = document.getElementById("email").value.trim();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm  = document.getElementById("confirmPassword").value;

    // Validation checks, one by one
    if (fullName === "" || email === "" || username === "" || password === "" || confirm === "") {
        showAlert("registerAlert", "Please fill in all fields.", "warning");
        return;
    }
    if (password.length < 6) {
        showAlert("registerAlert", "Password must be at least 6 characters long.", "warning");
        return;
    }
    if (password !== confirm) {
        showAlert("registerAlert", "Passwords do not match.", "danger");
        return;
    }

    const users = getRegisteredUsers();
    const taken = username.toLowerCase() === DEMO_USER.username ||
                  users.some(function (u) { return u.username.toLowerCase() === username.toLowerCase(); });

    if (taken) {
        showAlert("registerAlert", "That username is already taken. Please choose another.", "danger");
        return;
    }

    // Save the new user and go back to the login page
    users.push({ fullName: fullName, email: email, username: username, password: password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    showAlert("registerAlert", "Account created successfully! Redirecting to login...", "success");
    setTimeout(function () { window.location.href = "index.html"; }, 1500);
}

// Block the page if the user is not logged in
function requireLogin() {
    if (!getSession()) {
        window.location.replace("index.html");
        return false;
    }
    return true;
}

// Log out and return to the login page
function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = "index.html";
}


/* ---------- 5. NAVBAR AND FOOTER ---------- */
function setupNavbar(page) {
    // Highlight the link of the current page
    const activeLink = document.querySelector('[data-nav="' + page + '"]');
    if (activeLink) {
        activeLink.classList.add("active");
        activeLink.setAttribute("aria-current", "page");
    }

    // Show the logged-in name
    const session = getSession();
    const nameBox = document.getElementById("welcomeUser");
    if (session && nameBox) {
        nameBox.textContent = session.fullName;
    }

    // Connect the logout button
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
}

// Put the current year in the footer
function setFooterYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
}


/* ---------- 6. STUDENTS PAGE ---------- */
function renderStudents(list) {
    const body = document.getElementById("studentTableBody");
    const counter = document.getElementById("resultCount");
    if (!body) return;

    if (list.length === 0) {
        body.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No students found.</td></tr>';
    } else {
        body.innerHTML = list.map(function (s) {
            return "<tr>" +
                "<td>" + s.id + "</td>" +
                '<td class="fw-semibold">' + s.name + "</td>" +
                "<td>" + s.email + "</td>" +
                '<td><span class="badge badge-purple">' + s.course + "</span></td>" +
                "<td>Year " + s.year + "</td>" +
                "<td>" + s.gpa.toFixed(2) + "</td>" +
                "<td>" + getStatusBadge(s.status) + "</td>" +
                "</tr>";
        }).join("");
    }

    if (counter) {
        counter.textContent = "Showing " + list.length + " of " + students.length + " students";
    }
}

function setupStudentsPage() {
    renderStudents(students);

    const searchBox = document.getElementById("searchInput");
    if (searchBox) {
        searchBox.addEventListener("input", function () {
            renderStudents(filterList(students, searchBox.value));
        });
    }
}


/* ---------- 7. COURSES PAGE ---------- */
function renderCourses(list) {
    const body = document.getElementById("courseTableBody");
    const counter = document.getElementById("resultCount");
    if (!body) return;

    if (list.length === 0) {
        body.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No courses found.</td></tr>';
    } else {
        body.innerHTML = list.map(function (c) {
            const enrolled = countStudentsInCourse(c.code);
            const percent = Math.round((enrolled / c.capacity) * 100);
            return "<tr>" +
                '<td><span class="badge badge-purple">' + c.code + "</span></td>" +
                '<td class="fw-semibold">' + c.name + "</td>" +
                "<td>" + c.lecturer + "</td>" +
                "<td>" + c.credits + "</td>" +
                "<td>" + enrolled + " / " + c.capacity + "</td>" +
                '<td style="min-width:140px;">' +
                    '<div class="progress" role="progressbar" aria-label="Seats filled" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100">' +
                        '<div class="progress-bar bg-primary" style="width:' + percent + '%"></div>' +
                    "</div>" +
                    '<small class="text-muted">' + percent + "% full</small>" +
                "</td>" +
                "</tr>";
        }).join("");
    }

    if (counter) {
        counter.textContent = "Showing " + list.length + " of " + courses.length + " courses";
    }
}

function setupCoursesPage() {
    renderCourses(courses);

    const searchBox = document.getElementById("searchInput");
    if (searchBox) {
        searchBox.addEventListener("input", function () {
            renderCourses(filterList(courses, searchBox.value));
        });
    }
}

// Shared search: keep items where ANY field contains the typed text
function filterList(list, term) {
    const text = term.trim().toLowerCase();
    return list.filter(function (item) {
        return Object.values(item).join(" ").toLowerCase().includes(text);
    });
}


/* ---------- 8. DASHBOARD ---------- */
function setupDashboard() {
    // Statistics cards
    const activeCount = students.filter(function (s) { return s.status === "Active"; }).length;
    setText("statStudents", students.length);
    setText("statCourses", courses.length);
    setText("statActive", activeCount);
    setText("statGpa", getAverageGpa());

    // Charts
    drawEnrolmentChart();
    drawStatusChart();
}

function setText(elementId, value) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = value;
}

// Bar chart: number of students in each course
function drawEnrolmentChart() {
    const canvas = document.getElementById("enrolmentChart");
    if (!canvas || typeof Chart === "undefined") return;

    new Chart(canvas, {
        type: "bar",
        data: {
            labels: courses.map(function (c) { return c.code; }),
            datasets: [{
                label: "Students enrolled",
                data: courses.map(function (c) { return countStudentsInCourse(c.code); }),
                backgroundColor: "#8b5cf6",
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });
}

// Doughnut chart: students grouped by status
function drawStatusChart() {
    const canvas = document.getElementById("statusChart");
    if (!canvas || typeof Chart === "undefined") return;

    const statuses = ["Active", "On Leave", "Probation"];
    new Chart(canvas, {
        type: "doughnut",
        data: {
            labels: statuses,
            datasets: [{
                data: statuses.map(function (st) {
                    return students.filter(function (s) { return s.status === st; }).length;
                }),
                backgroundColor: ["#7c3aed", "#c4b5fd", "#4c1d95"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" } }
        }
    });
}


/* ---------- 9. START THE RIGHT CODE FOR EACH PAGE ---------- */
// Each HTML page will have <body data-page="..."> so we know which page we are on.
document.addEventListener("DOMContentLoaded", function () {
    const page = document.body.dataset.page;
    setFooterYear();

    // Login and register pages
    if (page === "login" || page === "register") {
        if (getSession()) {                       // already logged in? skip the login page
            window.location.replace("dashboard.html");
            return;
        }
        const form = document.getElementById(page === "login" ? "loginForm" : "registerForm");
        if (form) {
            form.addEventListener("submit", page === "login" ? handleLogin : handleRegister);
        }
        return;
    }

    // Protected pages: dashboard, students, courses
    if (page === "dashboard" || page === "students" || page === "courses") {
        if (!requireLogin()) return;
        setupNavbar(page);

        if (page === "dashboard") setupDashboard();
        if (page === "students")  setupStudentsPage();
        if (page === "courses")   setupCoursesPage();
    }
});