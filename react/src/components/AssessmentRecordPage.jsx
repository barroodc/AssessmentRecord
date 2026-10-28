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

    const [decisionRationale, setDecisionRationale] = useState("");

    const [evidenceStatuses, setEvidenceStatuses] = useState({});

    const [reviewDecision, setReviewDecision] = useState(null);


    const totalQuestions = (record.reviewQuestions ?? []).length;
    const answeredQuestions = (Object.values(answers).filter((actualQuestions) => actualQuestions !== null && actualQuestions !== undefined)).length;
    let progressPercentage = 0;



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
    const totalEvidenceCount = evidence.length;
    const allEvidenceReviewed = totalEvidenceCount > 0 && reviewedEvidenceCount === totalEvidenceCount;
    const allPlatformsReviewed = platforms.length > 0 && missingPlatforms.length === 0 && allEvidenceReviewed;


    const findingsDocumented = totalQuestions > 0 && totalQuestions === answeredQuestions && (record.reviewQuestions ?? [])
        .every((revQuest) => {
            return flags[revQuest.id] === false || (notes[revQuest.id]?.trim().length ?? 0) > 0;
        });

    const decisionRationaleEntered = decisionRationale.trim() !== "";

    const reviewPrerequisites = [allPlatformsReviewed, allEvidenceReviewed, findingsDocumented, openGapsCount === 0, decisionRationaleEntered];
    const totalChecks = reviewPrerequisites.length;
    const completedChecks = reviewPrerequisites.filter(((reviewPreq) => reviewPreq === true)).length;
    const unansweredQuestions = totalQuestions - answeredQuestions;

    const completionBlockers = [];

    if (reviewDecision === null) {
        completionBlockers.push("No review decision selected");
    }

    if (!decisionRationaleEntered) {
        completionBlockers.push("Decision rationale is required");
    }

    if (answeredQuestions !== totalQuestions) {
        completionBlockers.push(`${unansweredQuestions} review criteria remain unanswered`)
    }

    if (totalQuestions === 0) {
        completionBlockers.push("No review criteria are available");
    }


   const flaggedAndMissing = (record.reviewQuestions ?? []).filter((revQuest) => {
       return flags[revQuest.id] === true && (notes[revQuest.id]?.trim().length ?? 0) === 0;
   })

    if (flaggedAndMissing.length > 0) {
        completionBlockers.push(`${flaggedAndMissing.length} flagged findings require documentation`);
    }






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
                                   totalChecks={totalChecks} completedChecks={completedChecks} openGapsCount={openGapsCount} missingPlatforms={missingPlatforms}
                    reviewedEvidenceCount={reviewedEvidenceCount} totalEvidenceCount={totalEvidenceCount} allEvidenceReviewed={allEvidenceReviewed} allPlatformsReviewed={allPlatformsReviewed}
                    findingsDocumented={findingsDocumented} decisionRationaleEntered={decisionRationaleEntered} reviewDecision={reviewDecision} setReviewDecision={setReviewDecision}
                                   decisionRationale={decisionRationale} setDecisionRationale={setDecisionRationale}/>
                )}
            </div>


        </main>
    )
}