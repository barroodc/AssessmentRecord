import "./NextAction.css"

export default function NextAction({nextAction, nextActionDescription, setActiveTab, setIsReviewerNotesOpen}) {
    return (
        <section className="next-action-prompt">
            <h3 className="heading-for-next-action">Next Action</h3>
            <p className="main-action-text">{nextActionDescription}</p>
            <div className="next-action-buttons">
                <button type="button" className="ctn-review-btn" onClick={() => setActiveTab("review")}>Continue Review</button>
                <button type="button" className="reviewer-notes-btn" onClick={()=> setIsReviewerNotesOpen(true)}>Open Reviewer Notes</button>
            </div>
            <p className="description-for-next-action">The review can be completed from Reviewer Notes once outstanding items are resolved.</p>
        </section>
    )
}