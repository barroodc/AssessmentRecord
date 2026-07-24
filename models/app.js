import {
    assessmentRecord0001,
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

