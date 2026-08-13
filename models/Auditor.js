import {allInstancesOfAssessmentRecordsCatalog} from "./AssessmentRecord.js";


export const allInstancesOfAuditorsCatalog = [];
class Auditor {

    constructor(employeeUniqueID, firstName, lastName, profileImage, inOfficeStatus, onAssignmentBoard) {
        this.employeeUniqueID = employeeUniqueID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImage = profileImage;
        this.inOfficeStatus = inOfficeStatus;
        this.onAssignmentBoard = onAssignmentBoard;
        this.assessmentRecords = new Map(); //Assessment Records are keyed by ID for fast lookup.
        allInstancesOfAuditorsCatalog.push(this);
    }

    getAllAuditors() {
        return allInstancesOfAuditorsCatalog;
    }

    addAssessmentRecord(assessmentRecord) {
        assessmentRecord.assignedAuditor = `${this.firstName} ${this.lastName}`
        this.assessmentRecords.set(assessmentRecord.assessmentRecordID, assessmentRecord);
    }

    getAssessmentRecord(assessmentRecordID) {
       return this.assessmentRecords.get(assessmentRecordID);
    }

    getAssignedAssessmentRecordCount() {
        return this.assessmentRecords.size;
    }
    getAreAllAssessmentRecordsForASpecificAuditorActive() {
        let activeCount = 0;
        let otherStatus = 0;

        this.assessmentRecords.forEach((value) => {
            if (value.status === "Active") {
                activeCount++;
            } else {
                otherStatus++
            }
        })

        return otherStatus <= 0;
    }

    getHowManyAssignedAssessmentRecordsAreActiveForAuditor() {
        let activeCount = 0;

        this.assessmentRecords.forEach((value) => {
            if (value.status === "Active") {
                activeCount++;
            }
        })
        return activeCount;
    }

    getHowManyAssignedAssessmentRecordsAreActiveInTotal() {
        let activeCount = 0;

        this.assessmentRecords.forEach((value) => {
            if (value.status === "Active") {
                activeCount++;
            }
        })
        return activeCount;
    }

    getIsAuditorOnAssignmentBoard(auditor) {
        return auditor.onAssignmentBoard === true;
    }

    removeAssessmentRecord(assessmentRecordID) {
        return this.assessmentRecords.delete(assessmentRecordID);
    }

    updateAuditorFirstName(changedFirstName) {
        this.firstName = changedFirstName;
    }

    updateAuditorLastName(changedLastName) {
        this.lastName = changedLastName;
    }

    getAuditorFullName() {
        return `${this.firstName} ${this.lastName}`
    }

    updateAuditorProfileImage(profileImage) {
        this.profileImage = profileImage;
    }

    /*
    We can build logic around this where if the onAssignmentBoard status is set to false we can then just remove the auditor from the board altogether.
    Not that its realted to this but just some food for thought is that later on if we do remove someone from the board
    we are going to need logic to redistribute the assessment records to other auditors boards. This could be done a couple
    of different ways. We could for example add additional attributes to an auditor based on specialization to determine
    where the auditors assessment records to go to. However, the easier way and the way I think we should do this is
    to just randomly assign.
     */
    removeFromAssignmentBoard(auditor) {
        auditor.onAssignmentBoard = false;
    }
}


export default Auditor;
