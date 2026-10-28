import "./ReviewerNotes.css"
import CompletionChecklist from "./CompletionChecklist.jsx"

export default function ReviewerNotes({setIsReviewerNotesOpen, assessmentNotes, setAssessmentNotes, totalChecks, completedChecks, openGapsCount, missingPlatforms,
                                      reviewedEvidenceCount, totalEvidenceCount, allEvidenceReviewed, allPlatformsReviewed, findingsDocumented, decisionRationaleEntered,
                                          reviewDecision, setReviewDecision, decisionRationale, setDecisionRationale}) {

    const reviewDecisionButtons = ["Approved", "Approved with Follow-up", "Changes Required",
        "Unable to Verify", "Not Applicable"];

    return (
        <aside className="reviewer-notes-panel">
            <h3>Reviewer Notes</h3>
            <section>
                <h4>Review Status</h4>
                <p>{completedChecks} of {totalChecks} checks complete</p>
                <p>Open gaps: {openGapsCount}</p>
                <p>{missingPlatforms.length > 1 ? `Missing Coverage: ${missingPlatforms.join(', ')}` : missingPlatforms.length === 1 ?
                    `${missingPlatforms} coverage: Missing` : `Platform coverage: Complete`}</p>
                <p>Evidence Reviewed: {reviewedEvidenceCount} of {totalEvidenceCount}</p>
            </section>
            <textarea value={assessmentNotes} placeholder="Record overall observations, concerns, or context for this assessment..." onChange={(event) => setAssessmentNotes(event.target.value)}/>
            <CompletionChecklist openGapsCount={openGapsCount} allEvidenceReviewed={allEvidenceReviewed} allPlatformsReviewed={allPlatformsReviewed} findingsDocumented={findingsDocumented} decisionRationaleEntered={decisionRationaleEntered}/>
            <h4>Review Decision</h4>
            <section className="reviewer-decision">
                {reviewDecisionButtons.map((decision) => (
                    <button key={decision} className={reviewDecision === decision ? `selected` :  ``} onClick={() => setReviewDecision(decision)}> {decision} </button>
                ))}
            </section>
            <section className="decision-rationale-section">
                <h4>Decision Rationale</h4>
                <textarea value={decisionRationale} placeholder="Explain what the submitted evidence demonstrates and why this decision was reached..." onChange={(event) => setDecisionRationale(event.target.value)}/>
            </section>
            <button type="button" onClick={()=> setIsReviewerNotesOpen(false)}>Close</button>
        </aside>
    )
}