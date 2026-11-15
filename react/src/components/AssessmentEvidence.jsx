import "./AssessmentEvidence.css";
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import React from "react";

export default function AssessmentEvidence({record, evidenceStatuses, setEvidenceStatuses, isReviewComplete}) {
    const evidence = record.evidence ?? [];
    const [selectedEvidenceId, setSelectedEvidenceId] = React.useState(evidence[0]?.evidenceId ?? null);
    const [evidenceFilter, setEvidenceFilter] = React.useState("All");
    const filteredEvidence = evidence.filter((evid) => {
        return evidenceFilter === "All" || evid.type === evidenceFilter;
    })
    const selectedEvidence = filteredEvidence.find((evid) => evid.evidenceId === selectedEvidenceId);
    const selectedEvidenceIndex = filteredEvidence.findIndex((evid) => evid.evidenceId === selectedEvidenceId);

    const prevIndex = selectedEvidenceIndex === 0 ? filteredEvidence.length - 1 : selectedEvidenceIndex - 1;
    const nextIndex = selectedEvidenceIndex === filteredEvidence.length - 1 ? 0 : selectedEvidenceIndex + 1;

    function handleUpdateEvidenceStatus(status) {
        if (isReviewComplete || !selectedEvidence) {
            return;
        }

        setEvidenceStatuses((previousStatuses) => {
            return {
                ...previousStatuses,
                [selectedEvidence.evidenceId] : status
            }
        })
    }

    return (
        <section className="evidence-section">
            <h3 className="evidence-section-title">SUBMITTED EVIDENCE</h3>
            <div className="evidence-type-filter-btns">
                <button className="filter-btn" type="button" aria-pressed={evidenceFilter === "All"} onClick={() => {
                    setEvidenceFilter("All")
                    setSelectedEvidenceId(evidence[0]?.evidenceId ?? null);
                }}>All {evidence.length}</button>
                <button className="filter-btn" type="button" aria-pressed={evidenceFilter === "Behavioral"} onClick={() => {
                    setEvidenceFilter("Behavioral")
                    const firstBehavioralEvidence = evidence.find(evid => evid.type === "Behavioral");
                    setSelectedEvidenceId(
                        firstBehavioralEvidence?.evidenceId ?? null
                    )
                }}>Behavioral {evidence.filter(evid => evid.type === "Behavioral").length}</button>
                <button type="button" className="filter-btn" aria-pressed={evidenceFilter === "Technical"} onClick={() => {
                    setEvidenceFilter("Technical")
                    const firstTechnicalEvidence = evidence.find(evid => evid.type === "Technical");
                    setSelectedEvidenceId(
                        firstTechnicalEvidence?.evidenceId ?? null
                    );
                }}>Technical {evidence.filter(evid => evid.type === "Technical").length}</button>
            </div>
            <p>Total number of evidence items: {evidence.length}</p>

            <div className="evidence-showcase">
                <div className="evidence-card">
                    {filteredEvidence.map((evid) => (
                        <article key={evid.evidenceId} className={evid.evidenceId === selectedEvidenceId ? "selected-evidence" : ""}>
                            <div className="evidence-card-metadata">
                                <p>{evid.evidenceId}</p>
                                <p>{evid.description}</p>
                                <p>{evid.platform}</p>
                                <p>{evid.type}</p>
                                <button type="button" aria-current={evid.evidenceId === selectedEvidenceId ? true : undefined} onClick={()=> setSelectedEvidenceId(evid.evidenceId)}>View {evid.evidenceId}</button>
                            </div>
                        </article>
                    ))}
                    {evidence.length > 0 && filteredEvidence.length === 0 && (
                        <p>No evidence matches this filter.</p>
                    )}
                    {evidence.length === 0 ? "No evidence submitted" : ""}
                </div>

                <div className="evidence-showcase-main">
                    {selectedEvidence && (
                        <section className="extended-evidence-card">
                            <div className="current-evidence-item-container">
                                <button className="prev-evidence-item-btn" type="button" disabled={selectedEvidenceIndex === 0} onClick={() => setSelectedEvidenceId(filteredEvidence[prevIndex].evidenceId)}><ChevronLeft size={24} color="currentColor" /></button>
                                <span className="current-evidence-item">{evidence.indexOf(selectedEvidence) + 1} / {evidence.length}</span>
                                <button className="next-evidence-item-btn" type="button" disabled={selectedEvidenceIndex === filteredEvidence.length - 1} onClick={() => setSelectedEvidenceId(filteredEvidence[nextIndex].evidenceId)}><div></div><ChevronRight size={24} color="currentColor" /></button>
                            </div>
                            <div className="extended-evidence-card-metadata">
                                <p>{selectedEvidence.evidenceId}</p>
                                <p>{selectedEvidence.description}</p>
                                <p>{selectedEvidence.platform}</p>
                                <p>{selectedEvidence.type}</p>
                                {selectedEvidence.assetPath ? (<img src={selectedEvidence.assetPath} alt={selectedEvidence.description}/>) : "No preview available for this evidence"}

                                <h3>Mark Evidence As</h3>
                                <button className="selected-status-btns" aria-pressed={evidenceStatuses[selectedEvidence.evidenceId] === "Reviewed"} type="button" disabled={isReviewComplete} onClick={() => handleUpdateEvidenceStatus("Reviewed")}>Reviewed</button>
                                <button className="selected-status-btns" aria-pressed={evidenceStatuses[selectedEvidence.evidenceId] === "Valid"} type="button" disabled={isReviewComplete} onClick={() => handleUpdateEvidenceStatus("Valid")}>Valid</button>
                                <button className="selected-status-btns" aria-pressed={evidenceStatuses[selectedEvidence.evidenceId] === "Needs Clarification"} type="button" disabled={isReviewComplete} onClick={() => handleUpdateEvidenceStatus("Needs Clarification")}>Needs Clarification</button>
                                <button className="selected-status-btns" aria-pressed={evidenceStatuses[selectedEvidence.evidenceId] === "Insufficient"} type="button" disabled={isReviewComplete} onClick={() => handleUpdateEvidenceStatus("Insufficient")}>Insufficient</button>
                                <button className="selected-status-btns" aria-pressed={evidenceStatuses[selectedEvidence.evidenceId] === "Not Applicable"} type="button" disabled={isReviewComplete} onClick={() => handleUpdateEvidenceStatus("Not Applicable")}>Not Applicable</button>
                                <p>Current status: {evidenceStatuses[selectedEvidence.evidenceId] ?? "Not reviewed"}</p>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </section>
    )
}