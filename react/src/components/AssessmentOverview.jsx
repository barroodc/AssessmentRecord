import AssessmentSummary from "./AssessmentSummary.jsx";
import NeedsAttention from "./NeedsAttention.jsx";
import NextAction from "./NextAction.jsx";
import "./AssessmentOverview.css"
import React from "react";

export default function AssessmentOverview({record, setActiveTab, setIsReviewerNotesOpen, totalQuestions,
                                               answeredQuestions,progressPercentage, createdGaps, missingPlatforms}) {
    const evidence = record.evidence ?? [];
    const platforms = record.requiredPlatforms ?? [];
    const totalEvidence = evidence.length;
    const behavioralEvidence = evidence.filter((behavEv) => behavEv.type === "Behavioral").length;
    const technicalEvidence = totalEvidence - behavioralEvidence;
    const allPlatforms = ["Web", "iOS", "Android"];
    const reviewChecks = record.reviewChecks ?? [];
    const totalChecks = reviewChecks.length;
    const completedChecks = reviewChecks.filter((revCheck) => revCheck.completed).length;
    const completionPercentage = totalChecks > 0 ? (completedChecks / totalChecks) * 100 : 0;
    const nextAction = missingPlatforms.length > 0 ? "Request missing evidence" :
        totalChecks === 0 ? "Review setup required" :
            (completedChecks !== totalChecks) ? "Continue assessment review" :
                "Review ready for final decision";

    let nextActionDescription;

    if (missingPlatforms.length > 0) {
        nextActionDescription = `Review missing ${missingPlatforms.join(", ")} evidence and resolve remaining gaps before completing the assessment.`;
    } else if (totalChecks === 0) {
        nextActionDescription = "Configure the review checklist before continuing the assessment.";
    } else if (completedChecks !== totalChecks) {
        nextActionDescription = "Complete the remaining review checks before making a final decision.";
    } else {
        nextActionDescription = "All review checks are complete. The assessment is ready for a final decision.";
    }

    const openGaps = createdGaps.filter((gap) => gap.status === "open");
    return (
        <section className="assessment-overview">

            <AssessmentSummary totalEvidence={totalEvidence} behavioralEvidence={behavioralEvidence}
                               technicalEvidence={technicalEvidence} evidence={evidence} platforms={platforms}
                               allPlatforms={allPlatforms} totalChecks={totalChecks} completedChecks={completedChecks}
                               completionPercentage={completionPercentage}/>
            <NeedsAttention missingPlatforms={missingPlatforms} setActiveTab={setActiveTab} openGaps={openGaps}/>
            <NextAction nextAction={nextAction} nextActionDescription={nextActionDescription} setActiveTab={setActiveTab}
            setIsReviewerNotesOpen={setIsReviewerNotesOpen}/>

            <div>
                <h3>Auditor Review Progress</h3>
                <p>{answeredQuestions} out of {totalQuestions} answered</p>
                <p>{Math.round(progressPercentage)}%</p>
                <div className="answered-questions-progress-track">
                    <div
                        className="answered-questions-progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        </section>

    )
}