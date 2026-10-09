export default function AssessmentHeader({record, clearSelection}) {
    return (
        <header>
            <h1>{record.assessmentRecordId}</h1>
            <p>{record.assessmentRecordText}</p>
            <button onClick={() => clearSelection(null)}>Back to Dashboard</button>
        </header>
    )
}