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
import {allInstancesOfAssessmentRecordsCatalog} from "./AssessmentRecord.js";


const avatarColors = [
    "avatar-purple",
    "avatar-blue",
    "avatar-teal",
    "avatar-amber",
    "avatar-rose",
    "avatar-indigo"
];

const recordContainer = document.getElementById("recordContainer");

// Clear out anything in the container first
recordContainer.innerHTML = "";

// Loop through each ID and generate a full table row grid
for (let i = 0; i < idsFromAllAssessmentRecords.length; i++) {

    const currentRecordId = idsFromAllAssessmentRecords[i];
    const assignedAuditor = getAuditorForRecord(currentRecordId, auditorAssignments);


    recordContainer.innerHTML += `
        <article class="audit-row audit-grid">
            <div class="record-id">
                ${idsFromAllAssessmentRecords[i]}
            </div>
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
            
            <div class="project-id">
               ${projectIDForAllAssessmentRecords[i]}
            </div>
            
            <div class="person">
                <img class="avatar" src="${engEmployeeProfilePicsFromAllAssessmentRecords[i]}" alt="Eng assigned profile photo">
                <span>${namesOfEngineersAssignedFromAllAssessmentRecords[i]}</span>
            </div>
            
            <div>
                <span class="badge">
                  ${auditorStatusFromAllAssessmentRecords[i]}
                </span>
            </div>
            
            <div>
                <span class="badge">
                  ${riskLevelFromAllAssessmentRecords[i]}
                </span>
            </div>
            
            <div class="date-cell">
                  ${createdDateFromAllAssessmentRecords[i].toLocaleDateString("en-CA")}
            </div>
            
            <div>
                ${daysOnAuditBoardFromAllAssessmentRecords[i]}
            </div>
            
            <div class="person">
               ${assignedAuditor ? `
                    <img class="avatar" src="${assignedAuditor.profileImage}" alt="${assignedAuditor.getAuditorFullName()}'s profile photo">
                    <span>${assignedAuditor.getAuditorFullName()}</span>
               ` : `<span class="unassigned-text">None</span>`}
            </div>
            
        </article>
    `;
}


//Search by Record ID or Project ID

document.addEventListener('input', function (event) {
    const targetElement = event.target.closest('.search-input');

    if (targetElement && targetElement.tagName === "INPUT") {
        const userInput = targetElement.value.trim().toUpperCase();

        let indexOfSearch = idsFromAllAssessmentRecords.indexOf(userInput);
        if (indexOfSearch === -1) {
            indexOfSearch = projectIDForAllAssessmentRecords.indexOf(userInput);
        }

        if (indexOfSearch !== -1) {
            const currentRecordId = idsFromAllAssessmentRecords[indexOfSearch];
            const assignedAuditor = getAuditorForRecord(currentRecordId, auditorAssignments);

            recordContainer.innerHTML = `
                <article class="audit-row audit-grid">
                    <div class="record-id">
                        ${idsFromAllAssessmentRecords[indexOfSearch]}
                    </div>
                    <div class="description-cell">
                        <p>${textFromAllAssessmentRecords[indexOfSearch]}</p>
                        <button class="show-more-btn">
                            <span class="show-more-icon">&gt;</span>
                            Show more
                        </button>
                    </div>
                    <div>
                        <span class="active-status">
                            <span class="status-dot"></span>
                            ${statusFromAllAssessmentRecords[indexOfSearch]}
                        </span>
                    </div>
                    
                    <div class="project-id">
                       ${projectIDForAllAssessmentRecords[indexOfSearch]}
                    </div>
                    
                    <div class="person">
                        <img class="avatar" src="${engEmployeeProfilePicsFromAllAssessmentRecords[indexOfSearch]}" alt="Eng assigned profile photo">
                        <span>${namesOfEngineersAssignedFromAllAssessmentRecords[indexOfSearch]}</span>
                    </div>
                    
                    <div>
                        <span class="badge">
                          ${auditorStatusFromAllAssessmentRecords[indexOfSearch]}
                        </span>
                    </div>
                    
                    <div>
                        <span class="badge">
                          ${riskLevelFromAllAssessmentRecords[indexOfSearch]}
                        </span>
                    </div>
                    
                    <div class="date-cell">
                          ${createdDateFromAllAssessmentRecords[indexOfSearch].toLocaleDateString("en-CA")}
                    </div>
                    
                    <div>
                        ${daysOnAuditBoardFromAllAssessmentRecords[indexOfSearch]}
                    </div>
                    
                    <div class="person">
                       ${assignedAuditor ? `
                            <img class="avatar" src="${assignedAuditor.profileImage}" alt="${assignedAuditor.getAuditorFullName()}'s profile photo">
                            <span>${assignedAuditor.getAuditorFullName()}</span>
                       ` : `<span class="unassigned-text">None</span>`}
                    </div>
                </article>
            `;
        }
    }
});

const riskFilter = document.getElementById("risk-filter");

if (riskFilter) {
    riskFilter.addEventListener("change", (event) => {
        const riskLevelSelection = event.target.value.trim().toLowerCase();
        recordContainer.innerHTML = "";

        // Loop through the catalog array directly as you originally wrote it
        for (let i = 0; i < allInstancesOfAssessmentRecordsCatalog.length; i++) {
            const record = allInstancesOfAssessmentRecordsCatalog[i];
            const recordRisk = (record.riskLevel || "").toLowerCase();

            // Check if the risk matches selection
            if (riskLevelSelection === "all" || riskLevelSelection === "" || recordRisk === riskLevelSelection) {
                const assignedAuditor = getAuditorForRecord(record.assessmentRecordID, auditorAssignments);

                recordContainer.innerHTML += `
                    <article class="audit-row audit-grid">
                        <div class="record-id">
                            ${record.assessmentRecordID}
                        </div>
                        <div class="description-cell">
                            <p>${record.assessmentRecordText}</p>
                            <button class="show-more-btn">
                                <span class="show-more-icon">&gt;</span>
                                Show more
                            </button>
                        </div>
                        <div>
                            <span class="active-status">
                                <span class="status-dot"></span>
                                ${record.status}
                            </span>
                        </div>
                        
                        <div class="project-id">
                           ${record.projectID}
                        </div>
                        
                        <div class="person">
                            <img class="avatar" src="${record.engProfileImage}" alt="Eng assigned profile photo">
                            <span>${record.engContactAssigned}</span>
                        </div>
                        
                        <div>
                            <span class="badge">
                              ${record.auditorStatus}
                            </span>
                        </div>
                        <div>
                            <span class="badge">
                              ${record.riskLevel}
                            </span>
                        </div>
                        
                        <div class="date-cell">
                              ${record.createdDate.toLocaleDateString("en-CA")}
                        </div>
                        
                        <div>
                            ${record.daysOnAuditBoard}
                        </div>
                        
                        <div class="person">
                           ${assignedAuditor ? `
                                <img class="avatar" src="${assignedAuditor.profileImage}" alt="${assignedAuditor.getAuditorFullName()}'s profile photo">
                                <span>${assignedAuditor.getAuditorFullName()}</span>
                           ` : `<span class="unassigned-text">None</span>`}
                        </div>
                    </article>
                `;
            }
        }
    });
}

const auditorStatusFilter = document.getElementById('status-filter');

if (auditorStatusFilter) {
    auditorStatusFilter.addEventListener("change", (event) => {
        const auditorStatusLevelSelection = event.target.value.trim().toLowerCase();
        recordContainer.innerHTML = "";

        for (let i = 0; i < allInstancesOfAssessmentRecordsCatalog.length; i++) {
            const record = allInstancesOfAssessmentRecordsCatalog[i];
            const auditorStatusType = (record.auditorStatus || "").toLowerCase();


            if (auditorStatusLevelSelection === "All auditor statuses" || auditorStatusLevelSelection === "" || auditorStatusType === auditorStatusLevelSelection) {
                const assignedAuditor = getAuditorForRecord(record.assessmentRecordID, auditorAssignments);

                recordContainer.innerHTML += `
                    <article class="audit-row audit-grid">
                        <div class="record-id">
                            ${record.assessmentRecordID}
                        </div>
                        <div class="description-cell">
                            <p>${record.assessmentRecordText}</p>
                            <button class="show-more-btn">
                                <span class="show-more-icon">&gt;</span>
                                Show more
                            </button>
                        </div>
                        <div>
                            <span class="active-status">
                                <span class="status-dot"></span>
                                ${record.status}
                            </span>
                        </div>
                        
                        <div class="project-id">
                           ${record.projectID}
                        </div>
                        
                        <div class="person">
                            <img class="avatar" src="${record.engProfileImage}" alt="Eng assigned profile photo">
                            <span>${record.engContactAssigned}</span>
                        </div>
                        
                        <div>
                            <span class="badge">
                              ${record.auditorStatus}
                            </span>
                        </div>
                        <div>
                            <span class="badge">
                              ${record.riskLevel}
                            </span>
                        </div>
                        
                        <div class="date-cell">
                              ${record.createdDate.toLocaleDateString("en-CA")}
                        </div>
                        
                        <div>
                            ${record.daysOnAuditBoard}
                        </div>
                        
                        <div class="person">
                           ${assignedAuditor ? `
                                <img class="avatar" src="${assignedAuditor.profileImage}" alt="${assignedAuditor.getAuditorFullName()}'s profile photo">
                                <span>${assignedAuditor.getAuditorFullName()}</span>
                           ` : `<span class="unassigned-text">None</span>`}
                        </div>
                    </article>
                `;
            }
        }
    })
}

const projectSelectionFilter = document.getElementById('project-filter');
Object.entries(projectIDForAllAssessmentRecords).forEach(([key, projectId]) => {
    const optionForProjectId = document.createElement('option');
    optionForProjectId.value = String(projectId).trim();
    optionForProjectId.textContent = projectId;
    projectSelectionFilter.appendChild(optionForProjectId);
});

if (projectSelectionFilter) {
    projectSelectionFilter.addEventListener("change", (event) => {
        const projectSelection = event.target.value.trim().toLowerCase();
        let rowsHtml = "";

        for (let i = 0; i < allInstancesOfAssessmentRecordsCatalog.length; i++) {
            const record = allInstancesOfAssessmentRecordsCatalog[i];
            const projectSelected = String(record.projectID || "").trim().toLowerCase();

            if (projectSelection === "" || projectSelection === "all projects" || projectSelected === projectSelection) {
                const assignedAuditor = getAuditorForRecord(record.assessmentRecordID, auditorAssignments);

                rowsHtml += `
                    <article class="audit-row audit-grid">
                        <div class="record-id">${record.assessmentRecordID}</div>
                        <div class="description-cell">
                            <p>${record.assessmentRecordText}</p>
                            <button class="show-more-btn">
                                <span class="show-more-icon">&gt;</span> Show more
                            </button>
                        </div>
                        <div>
                            <span class="active-status">
                                <span class="status-dot"></span>
                                ${record.status}
                            </span>
                        </div>
                        <div class="project-id">${record.projectID}</div>
                        <div class="person">
                            <img class="avatar" src="${record.engProfileImage}" alt="Eng assigned profile photo">
                            <span>${record.engContactAssigned}</span>
                        </div>
                        <div><span class="badge">${record.auditorStatus}</span></div>
                        <div><span class="badge">${record.riskLevel}</span></div>
                        <div class="date-cell">${new Date(record.createdDate).toLocaleDateString("en-CA")}</div>
                        <div>${record.daysOnAuditBoard}</div>
                        <div class="person">
                           ${assignedAuditor ? `
                                <img class="avatar" src="${assignedAuditor.profileImage}" alt="${assignedAuditor.getAuditorFullName()}'s profile photo">
                                <span>${assignedAuditor.getAuditorFullName()}</span>
                           ` : `<span class="unassigned-text">None</span>`}
                        </div>
                    </article>
                `;
            }
        }

        recordContainer.innerHTML = rowsHtml;
    });
}

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


