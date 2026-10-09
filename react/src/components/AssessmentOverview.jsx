import AssessmentSummary from "./AssessmentSummary.jsx";
import NeedsAttention from "./NeedsAttention.jsx";

export default function AssessmentOverview({record}) {
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
    const missingPlatforms = platforms.filter((platform) => {
        const hasEvidence = evidence.some((evid) => evid.platform === platform);
        return !hasEvidence;
    })


    return (
        <section>

            <h2>Assessment Overview</h2>
            <p>{record.assessmentRecordId}</p>
            <p>{record.assessmentRecordText}</p>
            <p>{totalEvidence}</p>
            <p>{behavioralEvidence}</p>
            <p>{technicalEvidence}</p>
            <AssessmentSummary totalEvidence={totalEvidence} behavioralEvidence={behavioralEvidence}
                               technicalEvidence={technicalEvidence} evidence={evidence} platforms={platforms}
                               allPlatforms={allPlatforms} totalChecks={totalChecks} completedChecks={completedChecks}
                               completionPercentage={completionPercentage}/>
            <NeedsAttention missingPlatforms={missingPlatforms}/>
        </section>

    )
}