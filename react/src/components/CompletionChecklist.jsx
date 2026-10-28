import "./CompletionChecklist.css"

export default function CompletionChecklist({openGapsCount, allEvidenceReviewed, allPlatformsReviewed, findingsDocumented, decisionRationaleEntered}) {
    return(
        <section>
            <h4>Completion Checklist</h4>
            <label>
                <input type="checkbox" checked={allPlatformsReviewed} disabled/> All applicable platforms reviewed
            </label>
            <label>
                <input type="checkbox" checked={allEvidenceReviewed} disabled/> Evidence reviewed
            </label>
            <label>
                <input type="checkbox" checked={findingsDocumented} disabled/> Findings documented
            </label>
            <label>
                <input type="checkbox" checked={openGapsCount === 0} disabled/> Evidence gaps resolved
            </label>
            {openGapsCount > 1 ? <p>{openGapsCount} gaps remaining</p> : openGapsCount === 1 ? <p>{openGapsCount} gap remains</p> : ""}
            <label>
                <input type="checkbox" checked={decisionRationaleEntered} disabled/> Decision rationale entered
            </label>
        </section>
    )
}