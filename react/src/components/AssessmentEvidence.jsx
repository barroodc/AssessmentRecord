import "./AssessmentEvidence.css";
import React from "react";

export default function AssessmentEvidence({record, evidenceStatuses, setEvidenceStatuses}) {
    const evidence = record.evidence ?? [];
    const [selectedEvidenceId, setSelectedEvidenceId] = React.useState(evidence[0]?.evidenceId ?? null);
    const [evidenceFilter, setEvidenceFilter] = React.useState("All");
    const filteredEvidence = evidence.filter((evid) => {
        return evidenceFilter === "All" || evid.type === evidenceFilter;
    })
    const selectedEvidence = filteredEvidence.find((evid) => evid.evidenceId === selectedEvidenceId);
    const selectedEvidenceIndex = filteredEvidence.findIndex((evid) => evid.evidenceId === selectedEvidenceId);

    function handleUpdateEvidenceStatus(status) {
        setEvidenceStatuses((previousStatuses) => {
            return {
                ...previousStatuses,
                [selectedEvidence.evidenceId] : status
            }
        })
    }

    return (
        <section>
            <button type="button" aria-pressed={evidenceFilter === "All"} onClick={() => {
                setEvidenceFilter("All")
                setSelectedEvidenceId(evidence[0]?.evidenceId ?? null);
            }}>All</button>
            <button type="button" aria-pressed={evidenceFilter === "Behavioral"} onClick={() => {
                setEvidenceFilter("Behavioral")
                const firstBehavioralEvidence = evidence.find(evid => evid.type === "Behavioral");
                setSelectedEvidenceId(
                    firstBehavioralEvidence?.evidenceId ?? null
                )
            }}>Behavioral</button>
            <button type="button" aria-pressed={evidenceFilter === "Technical"} onClick={() => {
                setEvidenceFilter("Technical")
                const firstTechnicalEvidence = evidence.find(evid => evid.type === "Technical");
                setSelectedEvidenceId(
                    firstTechnicalEvidence?.evidenceId ?? null
                );
            }}>Technical</button>
            <h3>Submitted Evidence</h3>
            <p>Total number of evidence items: {evidence.length}</p>
            {filteredEvidence.map((evid) => (
                <article key={evid.evidenceId} className={evid.evidenceId === selectedEvidenceId ? "selected-evidence" : ""}>
                    <p>{evid.evidenceId}</p>
                    <p>{evid.type}</p>
                    <p>{evid.platform}</p>
                    <p>{evid.description}</p>
                    <button type="button" aria-current={evid.evidenceId === selectedEvidenceId ? true : undefined} onClick={()=> setSelectedEvidenceId(evid.evidenceId)}>View {evid.evidenceId}</button>

                </article>
            ))}

            {evidence.length > 0 && filteredEvidence.length === 0 && (
                <p>No evidence matches this filter.</p>
            )}

            {evidence.length === 0 ? "No evidence submitted" : ""}
            {selectedEvidence && (
                <section>
                    <h3>Selected Evidence Details</h3>
                    <p>{selectedEvidence.evidenceId}</p>
                    <p>{selectedEvidence.type}</p>
                    <p>{selectedEvidence.platform}</p>
                    <p>{selectedEvidence.description}</p>
                    <button type="button" disabled={selectedEvidenceIndex === filteredEvidence.length - 1} onClick={() => setSelectedEvidenceId(filteredEvidence[selectedEvidenceIndex + 1].evidenceId)}>Next</button>
                    <button type="button" disabled={selectedEvidenceIndex === 0} onClick={() => setSelectedEvidenceId(filteredEvidence[selectedEvidenceIndex - 1].evidenceId)}>Previous</button>
                    <p>{selectedEvidenceIndex + 1} / {filteredEvidence.length}</p>
                    <section>
                        <h3>Mark Evidence As</h3>
                        <button type="button" onClick={() => handleUpdateEvidenceStatus("Reviewed")}>Reviewed</button>
                        <button type="button" onClick={() => handleUpdateEvidenceStatus("Valid")}>Valid</button>
                        <button type="button" onClick={() => handleUpdateEvidenceStatus("Needs Clarification")}>Needs Clarification</button>
                        <button type="button" onClick={() => handleUpdateEvidenceStatus("Insufficient")}>Insufficient</button>
                        <button type="button" onClick={() => handleUpdateEvidenceStatus("Not Applicable")}>Not Applicable</button>
                        <p>Current status: {evidenceStatuses[selectedEvidence.evidenceId] ?? "Not reviewed"}</p>
                    </section>
                </section>
            )}
        </section>
    )
}