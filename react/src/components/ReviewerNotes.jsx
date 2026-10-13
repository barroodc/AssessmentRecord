import "./ReviewerNotes.css"

export default function ReviewerNotes({setIsReviewerNotesOpen}) {
    return (
        <aside className="reviewer-notes-panel">
            <h3>Reviewer Notes</h3>
            <p>Reviewer notes will appear here</p>
            <button type="button" onClick={()=> setIsReviewerNotesOpen(false)}>Close</button>
        </aside>
    )
}