
import mockData, {
    assessmentRecord0001,
    assessmentRecord0002,
    assessmentRecord0003,
    assessmentRecord0004,
    assessmentRecord0005,
    assessmentRecord0006,
    assessmentRecord0007,
    assessmentRecord0008,
    assessmentRecord0009,
    assessmentRecord0010,
    assessmentRecord0011,
    assessmentRecord0012,
    assessmentRecord0013,
    assessmentRecord0014,
    assessmentRecord0015,
    auditorOne,
    auditorTwo,
    auditorThree,
    auditorFour,
    auditorFive,
    idsFromAllAssessmentRecords,
    engEmployeeProfilePicsFromAllAssessmentRecords,
    namesOfEngineersAssignedFromAllAssessmentRecords
} from "../data/mockData.js";
import {allInstancesOfAuditorsCatalog} from "./Auditor.js";
import {allInstancesOfAssessmentRecordsCatalog} from "./AssessmentRecord.js";
import {allInstancesOfFullTimeEmployees} from "./FullTimeEmployee.js";




auditorOne.addAssessmentRecord(assessmentRecord0001);
auditorOne.addAssessmentRecord(assessmentRecord0002);
auditorOne.addAssessmentRecord(assessmentRecord0003);
auditorTwo.addAssessmentRecord(assessmentRecord0004);
auditorTwo.addAssessmentRecord(assessmentRecord0005);
auditorTwo.addAssessmentRecord(assessmentRecord0006);
auditorThree.addAssessmentRecord(assessmentRecord0007);
auditorThree.addAssessmentRecord(assessmentRecord0008);
auditorThree.addAssessmentRecord(assessmentRecord0009);
auditorFour.addAssessmentRecord(assessmentRecord0010);
auditorFour.addAssessmentRecord(assessmentRecord0011);
auditorFour.addAssessmentRecord(assessmentRecord0012);
auditorFive.addAssessmentRecord(assessmentRecord0013);
auditorFive.addAssessmentRecord(assessmentRecord0014);
auditorFive.addAssessmentRecord(assessmentRecord0015);




export const auditorAssignments = new Map();

for (const auditor of allInstancesOfAuditorsCatalog) {
    const matchingIDs = [];

    for (const assessmentID of idsFromAllAssessmentRecords) {
        if (auditor.assessmentRecords.has(assessmentID)) {
            matchingIDs.push(assessmentID);
        }
    }

    if (matchingIDs.length > 0) {
        auditorAssignments.set(auditor, matchingIDs);
    }
}


export function getAuditorForRecord(recordId, assignmentsMap) {
    for (const [auditor, recordIds] of assignmentsMap.entries()) {
        if (recordIds.includes(recordId)) {
            return auditor;
        }
    }
    return null;
}


