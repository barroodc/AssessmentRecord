import { useState } from "react";

export default function AssessmentGaps({createdGaps}) {

    const [activeGapsTab, setActiveGapsTab] = useState("gaps");
    const [expandedGapId, setExpandedGapId] = useState(null);

    return (
        <section>
            <h3>Gaps & Actions</h3>
            <button type="button" onClick={() => setActiveGapsTab("gaps")}>Evidence Gaps</button>
            <button type="button" onClick={() => setActiveGapsTab("actions")}>Action Items</button>
            {createdGaps.length > 0 && activeGapsTab === "gaps" ? createdGaps.map(gapsMade => (
                <article key={gapsMade.id}>
                    <button type="button" onClick={() => expandedGapId === gapsMade.id ? setExpandedGapId(null) : setExpandedGapId(gapsMade.id)}>
                        {expandedGapId === null ? "Details" : "Hide"}
                    </button>

                    <h4>{gapsMade.title}</h4>
                    <p>{gapsMade.description}</p>
                    <p>{gapsMade.requestedEvidence}</p>
                    <span>{gapsMade.status}</span>
                    <p>{gapsMade.reviewQuestionId}</p>
                </article>
            )): activeGapsTab === "actions" ? <h4>Action Items</h4> : <p>No evidence gaps have been created yet.</p>}

        </section>
    )
}