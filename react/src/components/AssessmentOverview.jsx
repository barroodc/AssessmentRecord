

export default function AssessmentOverview({record}) {
    const evidence = record.evidence ?? [];
    const platforms = record.requiredPlatforms ?? [];
    const totalEvidence = evidence.length;
    const behavioralEvidence = evidence.filter((behavEv) => behavEv.type === "Behavioral").length;
    const technicalEvidence = totalEvidence - behavioralEvidence;
    const webEvidence = evidence.filter((webEv) => webEv.platform === "Web").length;
    const iosEvidence = evidence.filter((iOSEv) => iOSEv.platform === "iOS").length;
    const androidEvidence = evidence.filter((andrEv) => andrEv.platform === "Android").length;
    const androidRequired = platforms.includes("Android");
    const androidMissing = androidRequired && androidEvidence === 0;
    const webRequired = platforms.includes("Web");
    const webMissing = webRequired && webEvidence === 0;
    const iosRequired = platforms.includes("iOS");
    const iosMissing = iosRequired && iosEvidence === 0;
    const allPlatforms = ["Web", "iOS", "Android"];




    return (
        <section>
            <div>
                {allPlatforms.map((platform) => (

                    <p key={platform}>{platform}</p>
                ))}
            </div>
            <h2>Assessment Overview</h2>
            <p>{record.assessmentRecordId}</p>
            <p>{record.assessmentRecordText}</p>
            <p>{totalEvidence}</p>
            <p>{behavioralEvidence}</p>
            <p>{technicalEvidence}</p>
            <p>Web: {!webRequired ? "Not applicable" : webMissing ? "Missing" : "Evidence Present"}</p>
            <p>iOS: {!iosRequired ? "Not applicable" : iosMissing ? "Missing" : "Evidence Present"}</p>
            <p>Android: {!androidRequired ? "Not applicable" : androidMissing ? "Missing" : "Evidence Present"}</p>
        </section>
    )
}