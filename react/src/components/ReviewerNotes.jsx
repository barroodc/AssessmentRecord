import "./ReviewerNotes.css"
import CompletionChecklist from "./CompletionChecklist.jsx"

export default function ReviewerNotes({setIsReviewerNotesOpen, assessmentNotes, setAssessmentNotes, totalChecks, completedChecks, openGapsCount, missingPlatforms,
                                      reviewedEvidenceCount, totalEvidenceCount, allEvidenceReviewed, allPlatformsReviewed, findingsDocumented, decisionRationaleEntered,
                                          reviewDecision, setReviewDecision, decisionRationale, setDecisionRationale, completionBlockers,
                                          isReviewComplete, handleCompleteReview, handleSaveAssessment, savedFeedback}) {

    const reviewDecisionButtons = ["Approved", "Approved with Follow-up", "Changes Required",
        "Unable to Verify", "Not Applicable"];

    return (
        <aside className="reviewer-notes-panel">
            <h3>Reviewer Notes</h3>
            <section className="review-status-section">
                <h4>Review Status</h4>
                <p className="review-progress-row">
                    <span className="label">Review Progress:</span>
                    <span className="value">{completedChecks} of {totalChecks} checks complete</span></p>
                <p className="open-gaps-row">
                    <span className="label">Open gaps:</span>
                    <span className="value">{openGapsCount}</span></p>
                <p className="missing-platforms-row">
                    {missingPlatforms.length > 1 ? (
                        <>
                            <span className="label">Missing Coverage:</span>
                            <span className="value">{missingPlatforms.join(', ')}</span>
                        </>
                    ) : missingPlatforms.length === 1 ? (
                        <>
                            <span className="label">{missingPlatforms} coverage:</span>
                            <span className="value missing">Missing</span>
                        </>
                    ) : (
                        <>
                            <span className="label">Platform coverage:</span>
                            <span className="value">Complete</span>
                        </>
                    )}
                </p>
                <p className="evidence-reviewed-title">
                    <span className="label">Evidence Reviewed:</span>
                    <span className="value">{reviewedEvidenceCount} of {totalEvidenceCount}</span></p>
            </section>
            <h4>Reviewer Notes</h4>
            <textarea value={assessmentNotes} placeholder="Record overall observations, concerns, or context for this assessment..." onChange={(event) => setAssessmentNotes(event.target.value)} readOnly={isReviewComplete}/>
            <CompletionChecklist openGapsCount={openGapsCount} allEvidenceReviewed={allEvidenceReviewed} allPlatformsReviewed={allPlatformsReviewed} findingsDocumented={findingsDocumented} decisionRationaleEntered={decisionRationaleEntered}/>

            <h4>Review Decision</h4>
            <section className="reviewer-decision">
                {reviewDecisionButtons.map((decision) => (
                    <button key={decision} className={reviewDecision === decision ? `selected` :  ``} onClick={() => setReviewDecision(decision)} disabled={isReviewComplete === true}> {decision} </button>
                ))}
            </section>
            <section className="decision-rationale-section">
                <h4>Decision Rationale</h4>
                <textarea value={decisionRationale} placeholder="Explain what the submitted evidence demonstrates and why this decision was reached..." onChange={(event) => setDecisionRationale(event.target.value)} readOnly={isReviewComplete}/>
            </section>
            {completionBlockers.length > 0 && (
                <section className="completion-blockers">
                    <h4>Cannot Complete Review</h4>

                    <ul>
                        {completionBlockers.map((blocker, index) => (
                            <li key={index}>{blocker}</li>
                        ))}
                    </ul>
                </section>
            )}
            {isReviewComplete === true && (
                <p>Review successfully completed</p>
            )}
            <button className="review-btn" type="button" onClick={handleCompleteReview} disabled={completionBlockers.length > 0 || isReviewComplete === true}>{isReviewComplete === true ? "Review Completed" : "Complete Review"}</button>
            <div className="save-and-close-section">
                <button className={isReviewComplete === true ? "save-assessment-complete" : "save-assessment-incomplete"} type="button" onClick={() => handleSaveAssessment()}>Save Draft</button>
                {savedFeedback && <p role="status">{savedFeedback}</p>}
                <button className="close-btn" type="button" onClick={()=> setIsReviewerNotesOpen(false)}>Close</button>
            </div>
        </aside>
    )
}