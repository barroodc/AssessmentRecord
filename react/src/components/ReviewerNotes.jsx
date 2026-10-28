import "./ReviewerNotes.css"
import CompletionChecklist from "./CompletionChecklist.jsx"

export default function ReviewerNotes({setIsReviewerNotesOpen, assessmentNotes, setAssessmentNotes, totalChecks, completedChecks, openGapsCount, missingPlatforms}) {
    return (
        <aside className="reviewer-notes-panel">
            <h3>Reviewer Notes</h3>
            <section>
                <h4>Review Status</h4>
                <p>{completedChecks} of {totalChecks} checks complete</p>
                <p>Open gaps: {openGapsCount}</p>
                <p>{missingPlatforms.length > 1 ? `Missing Coverage: ${missingPlatforms.join(', ')}` : missingPlatforms.length === 1 ?
                    `${missingPlatforms} coverage: Missing` : `Platform coverage: Complete`}</p>
            </section>
            <textarea value={assessmentNotes} onChange={(event) => setAssessmentNotes(event.target.value)}/>
            <CompletionChecklist openGapsCount={openGapsCount}/>
            <button type="button" onClick={()=> setIsReviewerNotesOpen(false)}>Close</button>
        </aside>
    )
}