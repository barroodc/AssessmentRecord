import { useState } from "react";

export default function AssessmentGaps({createdGaps, setCreatedGaps, createdActionItems, setCreatedActionItems}) {

    const [activeGapsTab, setActiveGapsTab] = useState("gaps");
    const [expandedGapId, setExpandedGapId] = useState(null);
    const [activeResponseGapId, setActiveResponseGapId] = useState(null);
    const [responseText, setResponseText] = useState("");
    const [actionTitle, setActionTitle] = useState("");
    const [actionDescription, setActionDescription] = useState("");
    const [actionAssignee, setActionAssignee] = useState("");
    const [actionPriority, setActionPriority] = useState("medium");
    const [actionEvidenceGapId, setActionEvidenceGapId] = useState("");

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

    function handleSubmitResponse(gapId, gapResponse) {

        if (gapResponse.trim() === "") {
            alert("please create a response before submitting")
            return
        }
            setCreatedGaps(previousGaps => {
                return previousGaps.map(gaps => {
                    if (gapId === gaps.id) {
                        return {
                            ...gaps,
                            responses: [...gaps.responses, gapResponse]
                        }
                    }
                    return gaps;
                })
            });
        setResponseText("")
        setActiveResponseGapId(null);
        }

        function handleCreateActionItem() {
        if (actionTitle.trim() === "" || actionDescription.trim() === "" || actionAssignee.trim() === "") {
            alert("please be sure to fill out all fields");
            return;
        }

        const newActionItem = {
            id: crypto.randomUUID(),
            title: actionTitle,
            description: actionDescription,
            assignee: actionAssignee,
            status: "open",
            evidenceGapId: actionEvidenceGapId || null,
            priorityLevel: actionPriority
        }

        setCreatedActionItems(actionItems => [
            ...actionItems,
            newActionItem
        ])
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

                            <div>
                                <h4>Responses</h4>
                                {gapsMade.responses.length === 0 && (
                                    <p>No responses yet</p>
                                )}
                                {gapsMade.responses.length !== 0 && (
                                   gapsMade.responses.map((response, index) => {
                                       return <p key={index}>{response}</p>
                                   })
                                )}
                            </div>

                            <button type="button" onClick={() => {
                                activeResponseGapId === gapsMade.id ? setActiveResponseGapId(null) : setActiveResponseGapId(gapsMade.id)
                                setResponseText("");
                            }
                            }>Add Response</button>
                            {
                               activeResponseGapId === gapsMade.id && (
                                    <div>
                                        <textarea id="active-response-text" value={responseText} onChange={(event) => setResponseText(event.target.value)}/>

                                        <button type="button" onClick={() => handleSubmitResponse(gapsMade.id, responseText)}>
                                            Submit Response
                                        </button>
                                    </div>
                                )
                            }

                                <button type="button" onClick={() => handleResolveGap(gapsMade.id, gapsMade.status === "open" ?
                                    "resolved" : "open")}>{gapsMade.status === "open" ? "Resolve Gap" : "Reopen Gap"}</button>
                        </div>
                    )}

                </article>
            )): activeGapsTab === "actions" ?
                <div>
                    <h4>Create Action Item</h4>
                    <input id="action-item-title" value={actionTitle} placeholder="Describe the action item" onChange={(event) => setActionTitle(event.target.value)}/>
                    <textarea id="action-item-description" value={actionDescription} onChange={(event) => setActionDescription(event.target.value)}/>
                    <input id="action-item-assignee" value={actionAssignee} placeholder="name of assignee" onChange={(event) => setActionAssignee(event.target.value)}/>
                    <select value={actionPriority} onChange={(event) => setActionPriority(event.target.value)}>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                    <select value={actionEvidenceGapId} onChange={(event) => setActionEvidenceGapId(event.target.value)}>
                        <option value="">No associated evidence gap</option>
                        {createdGaps.map((gaps) => (
                            <option value={gaps.id} key={gaps.id}>{gaps.title}</option>
                        ))}
                    </select>
                    <button type="button" onClick={() => handleCreateActionItem()}>Create Action Item</button>
                </div> : <p>No evidence gaps have been created yet.</p>}

        </section>
    )
}