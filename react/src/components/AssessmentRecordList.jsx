import data from "../data.json"
import AssessmentRecordRow from "./AssessmentRecordRow.jsx";

export default function AssessmentRecordList({search, selectAssessmentRecord}) {


    const assessmentRecords = data.filter((assessRecs) => {
        return assessRecs.assessmentRecordId.includes(search);
    }).map((assessRecs) => {
        return (
            <section key={assessRecs.assessmentRecordId}>
                <AssessmentRecordRow
                    clickAssessmentRecord = {selectAssessmentRecord}
                    assessmentRecordId={assessRecs.assessmentRecordId}
                    assessmentRecordText={assessRecs.assessmentRecordText}
                    status={assessRecs.status}
                    projectId={assessRecs.projectId}
                    engContact={assessRecs.engContact}
                    auditorStatus={assessRecs.auditorStatus}
                    riskLevel={assessRecs.riskLevel}
                    createdDate={assessRecs.createdDate}
                    daysOnBoard={assessRecs.daysOnBoard}
                    assignedAuditor={assessRecs.assignedAuditor}
                />
            </section>
        );
    });
    return (
        <table>
            <thead>
            <tr>
                <th scope="col">Record ID</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Project ID</th>
                <th scope="col">Eng Contact</th>
                <th scope="col">Auditor Status</th>
                <th scope="col">Risk</th>
                <th scope="col">Created</th>
                <th scope="col">Days on Board</th>
                <th scope="col">Assigned Auditor</th>
            </tr>
            </thead>
            <tbody>
            {assessmentRecords}
            </tbody>
        </table>
    );

}
