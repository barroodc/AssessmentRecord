import { useState } from "react";

export default function AssessmentGaps({createdGaps, setCreatedGaps}) {

    const [activeGapsTab, setActiveGapsTab] = useState("gaps");
    const [expandedGapId, setExpandedGapId] = useState(null);
    const [activeResponseGapId, setActiveResponseGapId] = useState(null);
    const [responseText, setResponseText] = useState("");

    function handleResolveGap(gapId, gapStatus) {
        setCreatedGaps(previousGaps => {
           return previousGaps.map(gaps => {
               if (gapId === gaps.id) {
                   return {
                       ...gaps,
                       status: gapStatus
                   }
               }
               return gaps;
           })
        });
    }

    return (
        <section>
            <h3>Gaps & Actions</h3>
            <button type="button" onClick={() => setActiveGapsTab("gaps")}>Evidence Gaps</button>
            <button type="button" onClick={() => setActiveGapsTab("actions")}>Action Items</button>
            {createdGaps.length > 0 && activeGapsTab === "gaps" ? createdGaps.map(gapsMade => (
                <article key={gapsMade.id}>
                    <button type="button" onClick={() => expandedGapId === gapsMade.id ? setExpandedGapId(null) : setExpandedGapId(gapsMade.id)}>
                        {expandedGapId === gapsMade.id ? "Hide" : "Details"}
                    </button>

                    <p>{gapsMade.reviewQuestionId}</p>
                    <span>{gapsMade.status}</span>
                    <h4>{gapsMade.title}</h4>


                    {expandedGapId === gapsMade.id && (
                        <div>
                            <p>{gapsMade.description}</p>
                            <p>{gapsMade.requestedEvidence}</p>

                            <button type="button" onClick={() => activeResponseGapId === gapsMade.id ? setActiveResponseGapId(null) : setActiveResponseGapId(gapsMade.id)}>Add Response</button>
                            {activeResponseGapId === gapsMade.id && <textarea id="active-response-text" value={responseText} onChange={(event) => setResponseText(event.target.value)}/>}

                                <button type="button" onClick={() => handleResolveGap(gapsMade.id, gapsMade.status === "open" ?
                                    "resolved" : "open")}>{gapsMade.status === "open" ? "Resolve Gap" : "Reopen Gap"}</button>
                        </div>
                    )}

                </article>
            )): activeGapsTab === "actions" ? <h4>Action Items</h4> : <p>No evidence gaps have been created yet.</p>}

        </section>
    )
}