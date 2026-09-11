import {
    auditorFullNames,
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
import {allInstancesOfAuditorsCatalog} from "./Auditor.js";
import {employeeProfileCards} from "../ui/employeeProfileCards.js";

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


        const assignedAuditor = getAuditorForRecord(recordId, auditorAssignments);

        if (currentSearchQuery !== "") {
            const matchesRecordId = recordId.toUpperCase().includes(currentSearchQuery);
            const matchesProjectId = projectId.toUpperCase().includes(currentSearchQuery);

            const auditorsNameCheck = assignedAuditor ? assignedAuditor.getAuditorFullName().toUpperCase() : "";

            const matchesAuditorName = auditorsNameCheck.includes(currentSearchQuery);

            if (!matchesRecordId && !matchesProjectId && !matchesAuditorName) {
                continue;
            }
        }


        const descriptionText = textFromAllAssessmentRecords[i];
        recordContainer.innerHTML += `
        <article class="audit-row audit-grid">
                <div class="record-id">${recordId}</div>
                <div class="description-cell">
                    <p>${descriptionText.length > 60 ? descriptionText.substring(0, 60) + "..." : descriptionText}</p>
                    
                    ${descriptionText.length > 60 ? `
                    <button class="show-more-btn" data-index="${i}"> 
                    <span class="show-more-icon">&gt;</span> Show more 
                    </button>
                    ` : ''}
                </div>
                <div>
                 <span class="active-status">
                        <span class="status-dot"></span>
                        ${statusFromAllAssessmentRecords[i]}
                    </span>
                </div>
                <div class="project-id">${projectId}</div>
                <div class="person">
                    <img class="avatar eng-avatar" data-eng-name = "${namesOfEngineersAssignedFromAllAssessmentRecords[i]}" src="${engEmployeeProfilePicsFromAllAssessmentRecords[i]}" alt="Eng assigned profile photo">
                    <span>${namesOfEngineersAssignedFromAllAssessmentRecords[i]}</span>
                </div>
                <div><span class="badge">${auditorStatusFromAllAssessmentRecords[i]}</span></div>
                <div><span class="badge">${riskLevelFromAllAssessmentRecords[i]}</span></div>
                <div class="date-cell">${createdDateFromAllAssessmentRecords[i].toLocaleDateString("en-CA")}</div>
                <div>${daysOnAuditBoardFromAllAssessmentRecords[i]}</div>
                <div class="person">
                   ${assignedAuditor ? `
                        <img class="avatar auditor-avatar" data-auditor-name="${assignedAuditor.getAuditorFullName()}" src="${assignedAuditor.profileImage}" alt="${assignedAuditor.getAuditorFullName()}'s profile photo">
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
        employeeProfileCards.employeeProfilesOnDashboard();
        employeeProfileCards.auditorProfilesOnDashboard();
    });
}

if (riskFilter) {
    riskFilter.addEventListener("change", (event) => {
        currentRiskFilter = event.target.value.trim().toLowerCase();
        updateDashboard();
        employeeProfileCards.employeeProfilesOnDashboard();
        employeeProfileCards.auditorProfilesOnDashboard();
    });
}

if (auditorStatusFilter) {
    auditorStatusFilter.addEventListener("change", (event) => {
        currentStatusFilter = event.target.value.trim().toLowerCase();
        updateDashboard();
        employeeProfileCards.employeeProfilesOnDashboard();
        employeeProfileCards.auditorProfilesOnDashboard();
    })
}

if (projectSelectionFilter) {
    projectSelectionFilter.addEventListener("change", (event) => {
        currentProjectFilter = event.target.value.trim().toLowerCase();
        updateDashboard();
        employeeProfileCards.employeeProfilesOnDashboard();
        employeeProfileCards.auditorProfilesOnDashboard();
    })
}


recordContainer.addEventListener('click', (event) => {
    const showMoreButton = event.target.closest('.show-more-btn');
    if (showMoreButton) {
        const recordIndex = showMoreButton.dataset.index;
        const fullDescriptionText = textFromAllAssessmentRecords[recordIndex];

        const cell = showMoreButton.closest('.description-cell');

        if (cell) {
            cell.innerHTML = `<p>${fullDescriptionText}</p>
            <button class="show-less-btn" data-index="${recordIndex}"> 
                    <span class="show-less-icon">&lt;</span> Show less 
                    </button>`
        }
    }
})

recordContainer.addEventListener('click', (event) => {
    const showLessButton = event.target.closest('.show-less-btn');
    if (showLessButton) {
        const recordIndex = showLessButton.dataset.index;

        const fullDescriptionText = textFromAllAssessmentRecords[recordIndex];

        const cell = showLessButton.closest('.description-cell');

        if (cell) {
            cell.innerHTML = `
                <p>${fullDescriptionText.length > 60 ? fullDescriptionText.substring(0, 60) + "..." : fullDescriptionText}</p>
                ${fullDescriptionText.length > 60 ? `
                    <button class="show-more-btn" data-index="${recordIndex}"> 
                        <span class="show-more-icon">&gt;</span> Show more 
                    </button>
                ` : ''}
            `;
        }
    }
});





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

employeeProfileCards.employeeProfilesOnDashboard();
employeeProfileCards.auditorProfilesOnDashboard();






