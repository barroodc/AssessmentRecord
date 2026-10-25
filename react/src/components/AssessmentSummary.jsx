import "./AssessmentSummary.css";

export default function AssessmentSummary({totalEvidence, behavioralEvidence, technicalEvidence, evidence, platforms,
                                          allPlatforms, totalChecks, completedChecks, completionPercentage}) {
    return (
        <section className="assessment-summary-card">
            <h3 className="assessment-summary-card-title">Assessment Summary</h3>
            <div className="assessment-summary-grid">
                <article>
                    <div className="assessment-evidence-count">{totalEvidence}</div>
                    <p className="assessment-evidence-label">Evidence items</p>
                    <p className="assessment-evidence-details">Behavioral Evidence: {behavioralEvidence} · Technical Evidence: {technicalEvidence}</p>
                </article>
                <div>
                    <p className="platform-coverage-title">Platform coverage</p>
                    {allPlatforms.map((platform) => {
                        const isPlatformRequired = platforms.includes(platform);
                        const platformEvidenceCount = evidence.filter((evid) => evid.platform === platform).length;
                        const isEvidenceMissing = isPlatformRequired && platformEvidenceCount === 0;

                        return (
                            <div className="platform-row" key={platform}>
                                <p className="platform-label">{platform}:</p>
                            <p className={!isPlatformRequired ? "platform-not-applicable" : isEvidenceMissing ? "platform-missing" : "platform-present"}> {!isPlatformRequired ? "Not applicable" : isEvidenceMissing ? "Missing"
                                : "Evidence Present"}</p>
                            </div>
                        )
                    })}
                </div>
                <article>
                    <p className="review-progress-title">Review progress</p>
                    <div className="review-progress-info">
                        {totalChecks !== 0 ? (
                            <>
                                <p className="review-progress-label">{completedChecks} of {totalChecks} checks completed</p>
                            </>
                        ): "No checks configured"}

                    </div>
                    <div className="review-progress-track">
                        <div
                            className="review-progress-fill"
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>

                </article>
            </div>

        </section>
    )
}