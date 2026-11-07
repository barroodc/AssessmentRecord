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

    const storageKey = `assessmentRecord:${record.assessmentRecordId}`;
    const [savedAssessment, setSavedAssessment] = useState(loadSavedAssessment);

    const [activeTab, setActiveTab] = useState("overview");
    const [isReviewerNotesOpen, setIsReviewerNotesOpen] = useState(false);
    const [createdGaps, setCreatedGaps] = useState(savedAssessment?.createdGaps ?? []);
    const [createdActionItems, setCreatedActionItems] = useState(savedAssessment?.createdActionItems ?? []);
    const [answers, setAnswers] = useState(() => savedAssessment?.answers ??
        (record.reviewQuestions ?? []).reduce((acc, question) => ({
            ...acc,
            [question.id]: question.answer
        }), {})
    );

    const [notes, setNotes] = useState(() => savedAssessment?.notes ?? (record.reviewQuestions ?? []).reduce((acc, note) =>({
        ...acc,
        [note.id]: note.reviewerNotes ?? ""
         }), {})
    );

    const [flags, setFlags] = useState(() => savedAssessment?.flags ?? (record.reviewQuestions ?? []).reduce((acc, flag) =>({
        ...acc,
        [flag.id]: flag.flagged ?? false
        }), {})
    );

    const [assessmentNotes, setAssessmentNotes] = useState(savedAssessment?.assessmentNotes ?? "");

    const [decisionRationale, setDecisionRationale] = useState(savedAssessment?.decisionRationale ?? "");

    const [evidenceStatuses, setEvidenceStatuses] = useState(savedAssessment?.evidenceStatuses ?? {});

    const [reviewDecision, setReviewDecision] = useState(savedAssessment?.reviewDecision ?? null);

    const [isReviewComplete, setIsReviewComplete] = useState(savedAssessment?.isReviewComplete ?? false);

    const [savedFeedback, setSavedFeedback] = useState("");



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

    if (reviewDecision === "Approved") {
        if (openGapsCount > 0) {
            completionBlockers.push("Approved reviews cannot have open gaps")
        }
        if (allEvidenceReviewed === false) {
            completionBlockers.push("All evidence must be reviewed before approval")
        }
        if (allPlatformsReviewed === false) {
            completionBlockers.push("All required platforms must have reviewed evidence before approval")
        }
    }

    if (reviewDecision === "Approved with Follow-up") {
        if (allEvidenceReviewed === false) {
            completionBlockers.push("All available evidence must be reviewed before follow-up approval")
        }
        if (openGapsCount > 0 && createdActionItems.length === 0) {
            completionBlockers.push("Open gaps require at least one follow-up action")
        }
    }

    if (reviewDecision === "Changes Required") {
        if (createdGaps.length === 0) {
            completionBlockers.push("At least one documented gap is required when requesting changes")
        }
    }

    if (reviewDecision === "Unable to Verify") {
        if (assessmentNotes.trim() === "") {
            completionBlockers.push("Explain why the assessment could not be verified in Reviewer Notes")
        }
    }

    if (reviewDecision === "Not Applicable") {
        if (assessmentNotes.trim() === "") {
            completionBlockers.push("Explain why the assessment is not applicable in Reviewer Notes")
        }
    }


   const flaggedAndMissing = (record.reviewQuestions ?? []).filter((revQuest) => {
       return flags[revQuest.id] === true && (notes[revQuest.id]?.trim().length ?? 0) === 0;
   })

    if (flaggedAndMissing.length > 0) {
        completionBlockers.push(`${flaggedAndMissing.length} flagged findings require documentation`);
    }

    function handleCompleteReview() {

        if (completionBlockers.length > 0) {
            return;
        }

        const didSave = handleSaveAssessment(true);

        if (didSave) {
            setIsReviewComplete(true);
        }

    }

    function loadSavedAssessment() {
        try {
           const assessIdStoredValue = localStorage.getItem(storageKey);
           return assessIdStoredValue ? JSON.parse(assessIdStoredValue) : null;
        } catch(error) {
            console.error(`Error reading or parsing localStorage key ${record.assessmentRecordId}`);
            console.log(error);
            return null;
        }
    }

    function handleSaveAssessment(completionStatus = isReviewComplete) {
        const assessmentDataFields = {
            createdGaps : createdGaps,
            createdActionItems : createdActionItems,
            answers : answers,
            notes : notes,
            flags : flags,
            assessmentNotes : assessmentNotes,
            decisionRationale : decisionRationale,
            evidenceStatuses : evidenceStatuses,
            reviewDecision : reviewDecision,
            isReviewComplete : completionStatus
        }

        try {
             localStorage.setItem(storageKey, JSON.stringify(assessmentDataFields));
             setSavedFeedback(completionStatus ? "Review completed and saved" : "Draft saved successfully")
             return true;
        } catch (error) {
            console.error(`Failed to save localStorage under key ${storageKey}`);
            console.log(error);
            setSavedFeedback("Unable to save assessment");
            return false;
        }
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
                        activeTab === "evidence" ? <AssessmentEvidence record={record} evidenceStatuses={evidenceStatuses} setEvidenceStatuses={setEvidenceStatuses} isReviewComplete={isReviewComplete}/> :
                            activeTab === "review" ? <AssessmentReview record={record} setCreatedGaps={setCreatedGaps} answers={answers} setAnswers={setAnswers}
                                                                       notes={notes} setNotes={setNotes} flags={flags} setFlags={setFlags} totalQuestions={totalQuestions}
                                                                       answeredQuestions={answeredQuestions} progressPercentage={progressPercentage} isReviewComplete={isReviewComplete}/> : activeTab==="gapsAndActions" ?
                                <AssessmentGaps createdGaps={createdGaps} setCreatedGaps={setCreatedGaps} createdActionItems={createdActionItems} setCreatedActionItems={setCreatedActionItems} isReviewComplete={isReviewComplete}/> : ""}

                </div>
                {isReviewerNotesOpen && (
                    <ReviewerNotes setIsReviewerNotesOpen={setIsReviewerNotesOpen} assessmentNotes={assessmentNotes} setAssessmentNotes={setAssessmentNotes}
                                   totalChecks={totalChecks} completedChecks={completedChecks} openGapsCount={openGapsCount} missingPlatforms={missingPlatforms}
                    reviewedEvidenceCount={reviewedEvidenceCount} totalEvidenceCount={totalEvidenceCount} allEvidenceReviewed={allEvidenceReviewed} allPlatformsReviewed={allPlatformsReviewed}
                    findingsDocumented={findingsDocumented} decisionRationaleEntered={decisionRationaleEntered} reviewDecision={reviewDecision} setReviewDecision={setReviewDecision}
                                   decisionRationale={decisionRationale} setDecisionRationale={setDecisionRationale} completionBlockers={completionBlockers}
                                   isReviewComplete={isReviewComplete} handleCompleteReview={handleCompleteReview} handleSaveAssessment={handleSaveAssessment}
                    savedFeedback={savedFeedback}/>
                )}
            </div>


        </main>
    )
}