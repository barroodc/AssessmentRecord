import {
    auditorStatusFromAllAssessmentRecords,
    createdDateFromAllAssessmentRecords,
    daysOnAuditBoardFromAllAssessmentRecords,
    engEmployeeProfilePicsFromAllAssessmentRecords,
    idsFromAllAssessmentRecords,
    namesOfEngineersAssignedFromAllAssessmentRecords,
    projectIDForAllAssessmentRecords,
    riskLevelFromAllAssessmentRecords,
    statusFromAllAssessmentRecords,
    textFromAllAssessmentRecords
} from "../data/mockData.js";
import {auditorAssignments, getAuditorForRecord} from "./testModels.js";
import AssessmentRecord, {allInstancesOfAssessmentRecordsCatalog} from "./AssessmentRecord.js";
import {allInstancesOfFullTimeEmployees} from "./FullTimeEmployee.js";


//Will set up code here to replace images of Engineers and Auditors who do not have an uploaded image.

const avatarColors = [
    "avatar-purple",
    "avatar-blue",
    "avatar-teal",
    "avatar-amber",
    "avatar-rose",
    "avatar-indigo"
];

const recordContainer = document.getElementById("recordContainer");
const riskFilter = document.getElementById("risk-filter");
const searchInput = document.querySelector(".search-input");
const auditorStatusFilter = document.getElementById('status-filter');
const projectSelectionFilter = document.getElementById('project-filter');


let currentSearchQuery = "";
let currentRiskFilter = "All Risk";
let currentStatusFilter = "All auditor statuses"
let currentProjectFilter = "All Projects"

function updateDashboard() {
    recordContainer.innerHTML = '';

    for (let i = 0; i < idsFromAllAssessmentRecords.length; i++) {
        const recordId = idsFromAllAssessmentRecords[i];
        const projectId = projectIDForAllAssessmentRecords[i];
        const recordRisk = riskLevelFromAllAssessmentRecords[i].toLowerCase();
        const auditorStatusType = (auditorStatusFromAllAssessmentRecords[i] || "").toLowerCase();
        const projectSelected = String(projectId || "").trim().toLowerCase();


        if (currentRiskFilter !== "All Risk" && currentRiskFilter !== "" && recordRisk !== currentRiskFilter) {
            continue;
        }

        if (currentStatusFilter !== "All auditor statuses" && currentStatusFilter !== "" && auditorStatusType !== currentStatusFilter) {
            continue;
        }

        if (currentProjectFilter !== "All Projects" && currentProjectFilter !== "" && projectSelected !== currentProjectFilter) {
            continue;
        }


        if (currentSearchQuery !== "") {
            const matchesRecordId = recordId.toUpperCase().includes(currentSearchQuery);
            const matchesProjectId = projectId.toUpperCase().includes(currentSearchQuery);

            if (!matchesRecordId && !matchesProjectId) {
                continue;
            }
        }

        const assignedAuditor = getAuditorForRecord(recordId, auditorAssignments);
        recordContainer.innerHTML += `
        <article class="audit-row audit-grid">
                <div class="record-id">${recordId}</div>
                <div class="description-cell">
                    <p>${textFromAllAssessmentRecords[i]}</p>
                    <button class="show-more-btn">
                        <span class="show-more-icon">&gt;</span>
                        Show more
                    </button>
                </div>
                <div>
                 <span class="active-status">
                        <span class="status-dot"></span>
                        ${statusFromAllAssessmentRecords[i]}
                    </span>
                </div>
                <div class="project-id">${projectId}</div>
                <div class="person">
                    <img class="avatar eng-avatar" src="${engEmployeeProfilePicsFromAllAssessmentRecords[i]}" alt="Eng assigned profile photo">
                    <span>${namesOfEngineersAssignedFromAllAssessmentRecords[i]}</span>
                </div>
                <div><span class="badge">${auditorStatusFromAllAssessmentRecords[i]}</span></div>
                <div><span class="badge">${riskLevelFromAllAssessmentRecords[i]}</span></div>
                <div class="date-cell">${createdDateFromAllAssessmentRecords[i].toLocaleDateString("en-CA")}</div>
                <div>${daysOnAuditBoardFromAllAssessmentRecords[i]}</div>
                <div class="person">
                   ${assignedAuditor ? `
                        <img class="avatar auditor-avatar" src="${assignedAuditor.profileImage}" alt="${assignedAuditor.getAuditorFullName()}'s profile photo">
                        <span>${assignedAuditor.getAuditorFullName()}</span>
                   ` : `<span class="unassigned-text">None</span>`}
                </div>
            </article>
        `;

    }
}

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        currentSearchQuery = event.target.value.trim().toUpperCase();
        updateDashboard();
    });
}

if (riskFilter) {
    riskFilter.addEventListener("change", (event) => {
        currentRiskFilter = event.target.value.trim().toLowerCase();
        updateDashboard();
    });
}

if (auditorStatusFilter) {
    auditorStatusFilter.addEventListener("change", (event) => {
        currentStatusFilter = event.target.value.trim().toLowerCase();
        updateDashboard();
    })
}

if (projectSelectionFilter) {
    projectSelectionFilter.addEventListener("change", (event) => {
        currentProjectFilter = event.target.value.trim().toLowerCase();
        updateDashboard();
    })
}

updateDashboard();



Object.entries(projectIDForAllAssessmentRecords).forEach(([key, projectId]) => {
    const optionForProjectId = document.createElement('option');
    optionForProjectId.value = String(projectId).trim();
    optionForProjectId.textContent = projectId;
    projectSelectionFilter.appendChild(optionForProjectId);
});



const activeRecords = document.getElementById('active-records');
const highRisk = document.getElementById('high-risk');
const unassigned = document.getElementById('unassigned');
const pendingResponse = document.getElementById('pending-response');

for (let i = 0; i < allInstancesOfAssessmentRecordsCatalog.length; i++) {
    /* We can probably use reduce here to add up all the records to display on the cards*/
    const activeRecordCount = allInstancesOfAssessmentRecordsCatalog.reduce((accumulator, currentValue) => {
        return currentValue.status === "Active" ? accumulator + 1 : accumulator;
    }, 0);
    activeRecords.innerHTML = `<h3>ACTIVE RECORDS</h3> <p>${activeRecordCount}</p>`;

    const highRiskCount = allInstancesOfAssessmentRecordsCatalog.reduce((accumulator, currentValue) => {
        return currentValue.riskLevel === "High" ? accumulator + 1 : accumulator;
    }, 0);

    highRisk.innerHTML = `<h3>HIGH RISK</h3> <p>${highRiskCount}</p>`

    const pendingResponseCount = allInstancesOfAssessmentRecordsCatalog.reduce((accumulator, currentValue) => {
        if (currentValue.auditorStatus === "Pending Auditor Re-review" || currentValue.auditorStatus === "Evidence Deficient"
            || currentValue.auditorStatus === "Returned for Review") {
            accumulator++;
        }
        return accumulator;
    }, 0);

    pendingResponse.innerHTML = `<h3>PENDING RESPONSE</h3> <p>${pendingResponseCount}</p>`;

    const unassignedCount = allInstancesOfAssessmentRecordsCatalog.reduce((accumulator, currentValue) => {
        if (!currentValue.assignedAuditor) {
            accumulator++;
        }
        return accumulator;
    }, 0);

    unassigned.innerHTML = `<h3>UNASSIGNED</h3> <p>${unassignedCount}</p>`
}





let engOrAuditorProfilePic = document.querySelectorAll(".eng-avatar");

for (let i = 0; i < engOrAuditorProfilePic.length; i++) {

    const image = engOrAuditorProfilePic[i];

    let hideTimeout;
    let cardContainer = null;

    image.addEventListener("mouseover", (event) => {

        clearTimeout(hideTimeout);

        if (!cardContainer) {
            cardContainer = document.createElement("div");
            cardContainer.className = "employeeCard";
        }

        const employee = allInstancesOfFullTimeEmployees[i];

        if (employee) {
            cardContainer.innerHTML = `
                <div class="employeeCardHeader"></div>

                <section class="employeeIdentitySection">

                    <div class="employeeProfileImageContainer">

                        <img
                            class="employeeProfileImage"
                            src="${employee.profileImage}"
                            alt="${employee.firstName} ${employee.lastName}"
                        >

                        <span
                            class="employeeStatusIndicator ${getEmployeeStatusClass(employee.inOfficeStatus)}"
                            title="${getEmployeeStatusText(employee.inOfficeStatus)}">
                        </span>

                    </div>

                    <div class="employeeNameAndTitle">
                        <h1>${employee.firstName} ${employee.lastName}</h1>
                        <p>${employee.title}</p>
                    </div>

                </section>

                <section class="employeeDetails">

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/clock-4.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">TENURE</p>
                            <p class="employeeDetailValue">
                                ${employee.joinedDate}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/users.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">TEAM</p>
                            <p class="employeeDetailValue">
                                ${employee.team}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/layers.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">WORK STREAM</p>
                            <p class="employeeDetailValue">
                                ${employee.workStream}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/user-round-pen.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">REPORTS TO</p>
                            <p class="employeeDetailValue">
                                ${employee.reportsTo}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/mail.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">EMAIL</p>
                            <p class="employeeDetailValue">
                                ${employee.email}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/phone.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">PHONE</p>
                            <p class="employeeDetailValue">
                                ${employee.phone}
                            </p>
                        </div>
                    </div>

                </section>

                <section class="employeeContactMethods">

                    <button class="contactButton primaryContactButton">
                        <img
                            src="../assets/ProfileCardIcons/mail.svg"
                            alt=""
                        >
                        <span>Email</span>
                    </button>

                    <button class="contactButton">
                        <img
                            src="../assets/ProfileCardIcons/phone.svg"
                            alt=""
                        >
                        <span>Call</span>
                    </button>

                    <button class="contactButton">
                        <img
                            src="../assets/ProfileCardIcons/message-square.svg"
                            alt=""
                        >
                        <span>Message</span>
                    </button>

                </section>
            `;
        }

        document.body.appendChild(cardContainer);

        cardContainer.style.position = "absolute";
        cardContainer.style.zIndex = "1000";
        cardContainer.style.left = event.pageX + 15 + "px";
        cardContainer.style.top = event.pageY + 15 + "px";

        cardContainer.addEventListener("mouseover", () => {
            clearTimeout(hideTimeout);
        });

        cardContainer.addEventListener("mouseleave", () => {
            startHideTimer();
        });

    });


    function startHideTimer() {

        clearTimeout(hideTimeout);

        hideTimeout = setTimeout(() => {

            if (cardContainer) {
                cardContainer.remove();
                cardContainer = null;
            }

        }, 400);
    }


    function getEmployeeStatusClass(status) {

        if (!status) {
            return "offline";
        }

        const normalizedStatus = status
            .toString()
            .trim()
            .toLowerCase();

        switch (normalizedStatus) {

            case "online":
            case "available":
            case "active":
                return "online";

            case "away":
                return "away";

            case "offline":
                return "offline";

            case "afterhours":
            case "after hours":
            case "outside working hours":
            case "outside of available working hours":
                return "afterHours";

            default:
                return "offline";
        }
    }


    function getEmployeeStatusText(status) {

        if (!status) {
            return "Offline";
        }

        const normalizedStatus = status
            .toString()
            .trim()
            .toLowerCase();

        switch (normalizedStatus) {

            case "online":
            case "available":
            case "active":
                return "Available";

            case "away":
                return "Away";

            case "offline":
                return "Offline";

            case "afterhours":
            case "after hours":
            case "outside working hours":
            case "outside of available working hours":
                return "Outside of Available Working Hours";

            default:
                return "Status Unknown";
        }
    }

}