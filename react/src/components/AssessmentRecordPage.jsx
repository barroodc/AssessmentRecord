import AssessmentHeader from "./AssessmentHeader.jsx"
import AssessmentTabs from "./AssessmentTabs.jsx";
import AssessmentOverview from "./AssessmentOverview.jsx";
import ReviewerNotes from "./ReviewerNotes.jsx";
import AssessmentEvidence from "./AssessmentEvidence.jsx";
import AssessmentReview from "./AssessmentReview.jsx"
import AssessmentGaps from "./AssessmentGaps.jsx";
import "./AssessmentRecordPage.css";
import React, {useState} from "react";

export default function AssessmentRecordPage({record, clearSelection}) {

    const [activeTab, setActiveTab] = useState("overview");
    const [isReviewerNotesOpen, setIsReviewerNotesOpen] = useState(false);
    const [createdGaps, setCreatedGaps] = useState([]);
    const [createdActionItems, setCreatedActionItems] = useState([]);
    const [answers, setAnswers] = useState(() =>
        (record.reviewQuestions ?? []).reduce((acc, question) => ({
            ...acc,
            [question.id]: question.answer
        }), {})
    );

    const [notes, setNotes] = useState(() => (record.reviewQuestions ?? []).reduce((acc, note) =>({
        ...acc,
        [note.id]: note.reviewerNotes ?? ""
         }), {})
    );

    const [flags, setFlags] = useState(() => (record.reviewQuestions ?? []).reduce((acc, flag) =>({
        ...acc,
        [flag.id]: flag.flagged ?? false
        }), {})
    );

    const [assessmentNotes, setAssessmentNotes] = useState("");

    const [evidenceStatuses, setEvidenceStatuses] = useState({});



    const totalQuestions = (record.reviewQuestions ?? []).length;
    const answeredQuestions = (Object.values(answers).filter((actualQuestions) => actualQuestions !== null && actualQuestions !== undefined)).length;
    let progressPercentage = 0;

    const reviewChecks = record.reviewChecks ?? [];
    const totalChecks = reviewChecks.length;
    const completedChecks = reviewChecks.filter((checks) => checks.completed === true).length;

    const openGapsCount = createdGaps.filter((gap) => gap.status === "open").length;

    const evidence = record.evidence ?? [];
    const platforms = record.requiredPlatforms ?? [];

    const missingPlatforms = platforms.filter((platform) => {
        const hasEvidence = evidence.some((evid) => evid.platform === platform);
        return !hasEvidence;
    })

    if (totalQuestions !== 0) {
        progressPercentage = (answeredQuestions / totalQuestions) * 100;
    }

    const reviewedEvidenceCount = evidence.filter((evid) => evidenceStatuses[evid.evidenceId] !== undefined).length;

    return (
        <main>
            <AssessmentHeader record={record} clearSelection={clearSelection}/>
            <div className="assessment-workspace">
                <div className="assessment-main-content">
                    <AssessmentTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
                    {activeTab === "overview" ? <AssessmentOverview record={record} setActiveTab={setActiveTab}
                                                                    setIsReviewerNotesOpen={setIsReviewerNotesOpen}
                                                                    totalQuestions={totalQuestions} answeredQuestions={answeredQuestions}
                                                                    progressPercentage={progressPercentage} createdGaps={createdGaps} missingPlatforms={missingPlatforms}/> :
                        activeTab === "evidence" ? <AssessmentEvidence record={record} evidenceStatuses={evidenceStatuses} setEvidenceStatuses={setEvidenceStatuses}/> :
                            activeTab === "review" ? <AssessmentReview record={record} setCreatedGaps={setCreatedGaps} answers={answers} setAnswers={setAnswers}
                                                                       notes={notes} setNotes={setNotes} flags={flags} setFlags={setFlags} totalQuestions={totalQuestions}
                                                                       answeredQuestions={answeredQuestions} progressPercentage={progressPercentage}/> : activeTab==="gapsAndActions" ?
                                <AssessmentGaps createdGaps={createdGaps} setCreatedGaps={setCreatedGaps} createdActionItems={createdActionItems} setCreatedActionItems={setCreatedActionItems}/> : ""}

                </div>
                {isReviewerNotesOpen && (
                    <ReviewerNotes setIsReviewerNotesOpen={setIsReviewerNotesOpen} assessmentNotes={assessmentNotes} setAssessmentNotes={setAssessmentNotes}
                                   totalChecks={totalChecks} completedChecks={completedChecks} openGapsCount={openGapsCount} missingPlatforms={missingPlatforms}/>
                )}
            </div>


        </main>
    )
}