import "./AssessmentSummary.css";

export default function AssessmentSummary({totalEvidence, behavioralEvidence, technicalEvidence, evidence, platforms,
                                          allPlatforms, totalChecks, completedChecks, completionPercentage}) {
    return (
        <section>
            <h3>Assessment Summary</h3>
            <article>
                {totalEvidence}
                <p>Evidence items</p>
                <p>Behavioral Evidence: {behavioralEvidence} · Technical Evidence: {technicalEvidence}</p>
            </article>
            <div>
                <p>Platform coverage</p>
                {allPlatforms.map((platform) => {
                    const isPlatformRequired = platforms.includes(platform);
                    const platformEvidenceCount = evidence.filter((evid) => evid.platform === platform).length;
                    const isEvidenceMissing = isPlatformRequired && platformEvidenceCount === 0;

                    return (

                        <p key={platform}>{platform}: {!isPlatformRequired ? "Not applicable" : isEvidenceMissing ? "Missing"
                            : "Evidence Present"}</p>

                    )
                })}
            </div>
            <article>
                <p>Review progress</p>
                <div>
                    {totalChecks !== 0 ? (
                        <>
                            <p>{completedChecks} of {totalChecks} checks completed</p>
                            <p>{completionPercentage}%</p>
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
        </section>
    )
}