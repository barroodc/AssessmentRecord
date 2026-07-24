
export const allInstancesOfAssessmentRecordsCatalog = [];


class AssessmentRecord {
    constructor(assessmentRecordID, assessmentRecordText, status,projectID,auditorStatus,
                createdDate, riskLevel, onAuditBoard, daysOnAuditBoard, engContactAssigned, engProfileImage) {
        this.assessmentRecordID = assessmentRecordID;
        this.assessmentRecordText = assessmentRecordText;
        this.status = status;
        this.projectID = projectID;
        this.auditorStatus = auditorStatus;
        this.createdDate = createdDate;
        this.riskLevel = riskLevel;
        this.onAuditBoard = onAuditBoard;
        this.daysOnAuditBoard = daysOnAuditBoard;
        this.engContactAssigned = engContactAssigned;
        this.engProfileImage = engProfileImage;
        allInstancesOfAssessmentRecordsCatalog.push(this);
    }

    getAllAssessmentRecords() {
        return allInstancesOfAssessmentRecordsCatalog;
    }

    getEngInitials() {
        return this.engContactAssigned.split(' ').map(word => word.charAt(0)).join('').toUpperCase()
    }


    getIsAssessmentRecordOverdue() {
        const highPriority = 5;
        const mediumPriority = 15;
        const lowPriority = 30;
        const typeOfStatuses = ["Validated", "Pending Auditor Re-review", "Evidence Deficient", "Retired",
            "Re-submitted to Eng", "None"];

        /*
        If number of days elapsed is greater than {priority level} and the auditor status has not yet moved into one
        of the following statues:
        Validated
        Pending Response
        Evidence Required
        Retired

        Then its overdue. Maybe later on a feature can be implemented to remind the Auditor of upcoming overdue
        AssessmentRecords.

        It may also be useful to determine how many days remaining before overdue as well.



         */
        let isStatusResolved = false;

        for (let i = 0; i < typeOfStatuses.length; i++) {
            if (this.auditorStatus === typeOfStatuses[i]) {
                isStatusResolved = true;
                break;
            }
        }

        if (!isStatusResolved) {
            if (this.riskLevel === "High" && this.daysOnAuditBoard > highPriority) {
                return `This task is overdue by ${this.daysOnAuditBoard - highPriority} days.`;
            } else if (this.riskLevel === "Medium" && this.daysOnAuditBoard > mediumPriority) {
                return `This task is overdue by ${this.daysOnAuditBoard - highPriority} days`;
            } else if (this.riskLevel === "Low" && this.daysOnAuditBoard > lowPriority) {
                return `This task is overdue by ${this.daysOnAuditBoard - highPriority} days`;
            }
        }
        return "This task is not overdue";
    }



    //I felt like this could be useful for looking up just the text belonging to the assessment record.

    getAssessmentRecordTextByID(assessmentRecordIDNumber) {
        if (assessmentRecordIDNumber === this.assessmentRecordID) {
            return this.assessmentRecordText;
        } else {
            return "ID does not exist. Please enter a valid ID number."
        }


    }

    updateProjectStatus(updatedStatus) {
        return this.status = updatedStatus;
    }

    getProjectIDByAssessmentRecordID(assessmentRecordIDNumber) {
        if (assessmentRecordIDNumber === this.assessmentRecordID) {
            return this.projectID;
        } else {
            return "ID does not exist. Please enter a valid ID number.";
        }
    }

    getAuditorStatus(updatedAuditorStatus) {
        return this.auditorStatus = updatedAuditorStatus;
    }

    getCreatedDate() {
        return this.createdDate;
    }

    getStatementRiskLevel() {
        return this.riskLevel;
    }

    getOnAuditBoard() {
        return this.onAuditBoard;
    }

    //This also equates to the number of days assigned to an Auditor.
    getNumberOfDaysAssessmentRecordsOnAssignmentBoard() {
        return this.daysOnAuditBoard;
    }

    isHighRisk() {
        return this.riskLevel === "High";
    }
}



export default AssessmentRecord;
