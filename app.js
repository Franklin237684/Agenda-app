Moi 2, [12/31/2025 9:17 PM]
:root {
    --primary: #6366F1;
    --bg: #F2F4F7;
    --white: #FFFFFF;
    --text: #1F2933;
    --muted: #6B7280;
    --danger: #DC2626;
}

* {
    box-sizing: border-box;
    font-family: system-ui, sans-serif;
    margin: 0;
    padding: 0;
}

body {
    background: var(--bg);
    color: var(--text);
}

header {
    background: var(--white);
    padding: 16px;
    text-align: center;
}

main {
    padding: 16px;
    padding-bottom: 90px;
}

section {
    display: none;
}

section.active {
    display: block;
}

h2 {
    margin-bottom: 12px;
}

.card {
    background: var(--white);
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 16px;
}

input, button {
    width: 100%;
    padding: 14px;
    margin-top: 10px;
    border-radius: 12px;
    border: 1px solid #ddd;
}

button {
    background: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
}

label {
    display: block;
    margin-top: 10px;
}

#calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

#calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
}

.day {
    background: #F9FAFB;
    padding: 12px;
    border-radius: 10px;
    text-align: center;
    position: relative;
    cursor: pointer;
}

.day.marked {
    background: #FEE2E2;
}

.cross {
    position: absolute;
    top: 4px;
    right: 6px;
    color: var(--danger);
    font-weight: bold;
}

nav {
    position: fixed;
    bottom: 12px;
    left: 12px;
    right: 12px;
    background: var(--white);
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    padding: 10px;
}

nav button {
    background: none;
    color: var(--text);
    font-size: 22px;
}

Moi 2, [12/31/2025 9:17 PM]
let currentDate = new Date();
let selectedDates = JSON.parse(localStorage.getItem("selectedDates")) || [];
let activities = JSON.parse(localStorage.getItem("activities")) || [];

/* INITIALISATION */
document.addEventListener("DOMContentLoaded", () => {
    checkLanguage();
    checkUsername();
    updateGreeting();
    renderCalendar();
    renderActivities();
    updateEarnings();
});

/* LANGUE */
function setLanguage(lang) {
    localStorage.setItem("language", lang);
    showSection("welcome-section");
}

function checkLanguage() {
    if (!localStorage.getItem("language")) {
        showSection("language-section");
    }
}

/* NOM UTILISATEUR */
document.getElementById("saveNameBtn").addEventListener("click", () => {
    const name = document.getElementById("usernameInput").value.trim();
    if (name) {
        localStorage.setItem("username", name);
        updateGreeting();
        showSection("calendar-section");
    }
});

function checkUsername() {
    if (localStorage.getItem("username")) {
        showSection("calendar-section");
    }
}

function updateGreeting() {
    const name = localStorage.getItem("username");
    if (!name) return;

    const hour = new Date().getHours();
    const text = hour < 18 ? "Bonjour" : "Bonsoir";
    document.getElementById("greeting").innerText = ${text} ${name};
}

/* NAVIGATION */
function showSection(id) {
    document.querySelectorAll("section").forEach(s =>
        s.classList.remove("active")
    );
    document.getElementById(id).classList.add("active");
}

/* CALENDRIER */
function renderCalendar() {
    const daysContainer = document.getElementById("calendar-days");
    const monthYear = document.getElementById("monthYear");

    daysContainer.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.innerText = currentDate.toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric"
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        daysContainer.appendChild(document.createElement("div"));
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dateKey = ${year}-${month + 1}-${d};
        const dayEl = document.createElement("div");
        dayEl.className = "day";
        dayEl.innerText = d;

        if (selectedDates.includes(dateKey)) {
            dayEl.classList.add("marked");
            dayEl.innerHTML = ${d}<span class="cross">×</span>;
        }

        dayEl.onclick = () => toggleDate(dateKey);
        daysContainer.appendChild(dayEl);
    }
}

document.getElementById("prevMonth").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

function toggleDate(dateKey) {
    if (selectedDates.includes(dateKey)) {
        selectedDates = selectedDates.filter(d => d !== dateKey);
    } else {
        selectedDates.push(dateKey);
    }

    localStorage.setItem("selectedDates", JSON.stringify(selectedDates));
    renderCalendar();
    updateEarnings();
}

/* ACTIVITÉS */
document.getElementById("addActivityBtn").onclick = () => {
    const date = activityDate.value;
    const text = activityText.value;
    const reminder = activityReminder.checked;
    const time = reminderTime.value;

    if (!date || !text) return;

    activities.push({ date, text, reminder, time });
    localStorage.setItem("activities", JSON.stringify(activities));
    renderActivities();
};

function renderActivities() {
    const list = document.getElementById("activitiesList");
    list.innerHTML = "";

    activities.forEach(a => {
        const li = document.createElement("li");
        li.innerText = ${a.date} - ${a.text};
        if (a.reminder) li.innerText +=  ⏰ ${a.time};
        list.appendChild(li);
    });
}

/* GAINS */
document.getElementById("dailyRate").oninput = updateEarnings;

function updateEarnings() {
    const rate = parseFloat(dailyRate.value || 0);
    const days = selectedDates.length;
    const total = days * rate;

    daysCount.innerText = Jours pointés : ${days};
    totalEarnings.innerText = Total : ${total.toFixed(2)};
}
