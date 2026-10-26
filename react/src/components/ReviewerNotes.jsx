import "./ReviewerNotes.css"

export default function ReviewerNotes({setIsReviewerNotesOpen, assessmentNotes, setAssessmentNotes, totalChecks, completedChecks, openGapsCount}) {
    return (
        <aside className="reviewer-notes-panel">
            <h3>Reviewer Notes</h3>
            <section>
                <h4>Review Status</h4>
                <p>{completedChecks} of {totalChecks} checks complete</p>
                <p>Open gaps: {openGapsCount}</p>
            </section>
            <textarea value={assessmentNotes} onChange={(event) => setAssessmentNotes(event.target.value)}/>
            <button type="button" onClick={()=> setIsReviewerNotesOpen(false)}>Close</button>
        </aside>
    )
}