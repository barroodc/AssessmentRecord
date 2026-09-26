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
import {renderAssessmentRecordRow} from "../ui/assessmentRecordRowRenderer.js";

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
        const auditorStatusType =
            (auditorStatusFromAllAssessmentRecords[i] || "").toLowerCase();

        const projectSelected =
            String(projectId || "").trim().toLowerCase();


        // Risk filter
        if (
            currentRiskFilter !== "All Risk" &&
            currentRiskFilter !== "" &&
            recordRisk !== currentRiskFilter
        ) {
            continue;
        }


        // Auditor status filter
        if (
            currentStatusFilter !== "All auditor statuses" &&
            currentStatusFilter !== "" &&
            auditorStatusType !== currentStatusFilter
        ) {
            continue;
        }


        // Project filter
        if (
            currentProjectFilter !== "All Projects" &&
            currentProjectFilter !== "" &&
            projectSelected !== currentProjectFilter
        ) {
            continue;
        }


        const assignedAuditor =
            getAuditorForRecord(recordId, auditorAssignments);

        const descriptionText =
            textFromAllAssessmentRecords[i];


        // Search
        if (currentSearchQuery !== "") {
            const matchesRecordId =
                recordId.toUpperCase().includes(currentSearchQuery);

            const matchesProjectId =
                projectId.toUpperCase().includes(currentSearchQuery);

            const matchesDescriptionText =
                descriptionText.toUpperCase().includes(currentSearchQuery);

            const auditorsNameCheck = assignedAuditor
                ? assignedAuditor.getAuditorFullName().toUpperCase()
                : "";

            const matchesAuditorName =
                auditorsNameCheck.includes(currentSearchQuery);


            if (
                !matchesRecordId &&
                !matchesProjectId &&
                !matchesAuditorName &&
                !matchesDescriptionText
            ) {
                continue;
            }
        }


        const rowHTML = renderAssessmentRecordRow({
            recordId: recordId,
            descriptionText: descriptionText,
            status: statusFromAllAssessmentRecords[i],
            projectId: projectId,
            engineerName: namesOfEngineersAssignedFromAllAssessmentRecords[i],
            engineerImage: engEmployeeProfilePicsFromAllAssessmentRecords[i],
            auditorStatus: auditorStatusFromAllAssessmentRecords[i],
            risk: riskLevelFromAllAssessmentRecords[i],
            createdDate: createdDateFromAllAssessmentRecords[i],
            daysOnBoard: daysOnAuditBoardFromAllAssessmentRecords[i],
            assignedAuditor: assignedAuditor,
            index: i
        });


        recordContainer.innerHTML += rowHTML;
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






