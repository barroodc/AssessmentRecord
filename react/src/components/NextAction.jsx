import "./NextAction.css"

export default function NextAction({nextAction, nextActionDescription, setActiveTab, setIsReviewerNotesOpen}) {
    return (
        <section className="next-action-prompt">
            <h3 className="heading-for-next-action">Next Action</h3>
            <p className="main-action-text">{nextActionDescription}</p>
            <button type="button" className="ctn-review-btn" onClick={() => setActiveTab("review")}>Continue Review</button>
            <button type="button" onClick={()=> setIsReviewerNotesOpen(true)}>Open Reviewer Notes</button>
            <p className="description-for-next-action">{nextAction}</p>
        </section>
    )
}