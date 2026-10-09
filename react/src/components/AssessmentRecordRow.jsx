 export default function AssessmentRecordRow({clickAssessmentRecord, assessmentRecordId, assessmentRecordText, status, projectId,
                                             engContact, auditorStatus, riskLevel, createdDate,
                                                 daysOnBoard, assignedAuditor}) {
     return (
        <tr onClick={()=> clickAssessmentRecord(assessmentRecordId)}>
            <th scope="row">{assessmentRecordId}</th>
            <td>{assessmentRecordText}</td>
            <td>{status}</td>
            <td>{projectId}</td>
            <td>{engContact}</td>
            <td>{auditorStatus}</td>
            <td>{riskLevel}</td>
            <td>{createdDate}</td>
            <td>{daysOnBoard}</td>
            <td>{assignedAuditor}</td>
        </tr>
     )
}