
import React from "react";

export default function AssessmentEvidence({record}) {
    const evidence = record.evidence ?? [];
    const [selectedEvidenceId, setSelectedEvidenceId] = React.useState(evidence[0]?.evidenceId ?? null);
    const selectedEvidence = evidence.find((evid) => evid.evidenceId === selectedEvidenceId);
    const selectedEvidenceIndex = evidence.findIndex((evid) => evid.evidenceId === selectedEvidenceId);
    return (
        <section>
            <h3>Submitted Evidence</h3>
            <p>Total number of evidence items: {evidence.length}</p>
            {evidence.map((evid) => (
                <article key={evid.evidenceId}>
                    <p>{evid.evidenceId}</p>
                    <p>{evid.type}</p>
                    <p>{evid.platform}</p>
                    <p>{evid.description}</p>
                    <button type="button" onClick={()=> setSelectedEvidenceId(evid.evidenceId)}>Display Evidence ID</button>
                </article>
            ))}

            {evidence.length === 0 ? "No evidence submitted" : ""}
            {selectedEvidence && (
                <section>
                    <h3>Selected Evidence Details</h3>
                    <p>{selectedEvidence.evidenceId}</p>
                    <p>{selectedEvidence.type}</p>
                    <p>{selectedEvidence.platform}</p>
                    <p>{selectedEvidence.description}</p>
                    <button type="button" disabled={selectedEvidenceIndex === evidence.length - 1} onClick={() => setSelectedEvidenceId(evidence[selectedEvidenceIndex + 1].evidenceId)}>Next</button>
                    <button type="button" disabled={selectedEvidenceIndex === 0} onClick={() => setSelectedEvidenceId(evidence[selectedEvidenceIndex - 1].evidenceId)}>Previous</button>
                    <p>{selectedEvidenceIndex + 1} / {evidence.length}</p>
                </section>
            )}
        </section>
    )
}