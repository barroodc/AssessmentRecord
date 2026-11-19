import "./AssessmentReview.css"
import React, {useState} from "react";
import { Flag } from "lucide-react";

export default function AssessmentReview({record, setCreatedGaps, answers, setAnswers,
                                             notes, setNotes, flags, setFlags, totalQuestions,
                                             answeredQuestions, progressPercentage, isReviewComplete}) {
    const reviewQuestions = record.reviewQuestions ?? [];

    const [activeGapQuestionId, setActiveGapQuestionId] = useState(null);

    const [gapTitle, setGapTitle] = useState("");

    const [gapDescription, setGapDescription] = useState("");

    const [requestedEvidence, setRequestedEvidence] = useState("");

    const [trackValidationError, setTrackValidationError] = useState("");


    function handleCreateGap() {

        if (isReviewComplete === true) {
            return
        }


        if (gapTitle.trim() === "" || gapDescription.trim() === "" || requestedEvidence.trim() === "") {
            setTrackValidationError("Please complete all required fields")
            return;
        }


        const newGap = {
           id: crypto.randomUUID(),
            reviewQuestionId: activeGapQuestionId,
            title: gapTitle,
            description: gapDescription,
            requestedEvidence: requestedEvidence,
            status: "open",
            responses: []
        }

        setCreatedGaps(previousGaps => [
            ...previousGaps,
            newGap
        ]);

        setActiveGapQuestionId(null)
        setGapTitle("")
        setGapDescription("")
        setRequestedEvidence("")
        setTrackValidationError("")
        console.log(newGap);
    }

    return (
        <section className="auditor-reviews-and-findings">
            <h3>AUDITOR REVIEW / FINDINGS</h3>
            <div className="review-progress-overview">
                <div className="review-progress-overview-top">
                    <p>Review Progress</p>
                    <p>{answeredQuestions} of {totalQuestions} completed · {progressPercentage}%</p>
                </div>
                <div className="answered-questions-progress-track" role="progressbar" aria-label="Review questions answered"
                     aria-valuenow={answeredQuestions} aria-valuemin={0} aria-valuemax={totalQuestions}>
                    <div
                        className="answered-questions-progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
            {reviewQuestions.map(reviewItems => {
                const supportingEvidence = (record.evidence ?? []).filter(
                    (evidence) => (reviewItems.evidenceIds ?? []).includes(evidence.evidenceId))
                return (
                    <section className="review-evidence-card-section" key={reviewItems.id}>
                        <article>
                            <div className="review-card-header">
                                <div className="review-evidence-card-label-and-description">
                                    <h4>{reviewItems.label}</h4>
                                    <p>{reviewItems.description}</p>
                                </div>

                                <div className="review-selection-btns">
                                    <button type="button" aria-pressed={answers[reviewItems.id] === "yes"} className={answers[reviewItems.id] === "yes" ? "selected-answer selected-yes-btn" : ""} disabled={isReviewComplete} onClick={() => setAnswers(previousAnswers => ({
                                        ...previousAnswers,
                                        [reviewItems.id]: "yes"
                                    }))}>Yes</button>

                                    <button type="button" aria-pressed={answers[reviewItems.id] === "no"} className={answers[reviewItems.id] === "no" ? "selected-answer selected-no-btn" : ""} disabled={isReviewComplete} onClick={() => setAnswers(previousAnswers => ({
                                        ...previousAnswers,
                                        [reviewItems.id]: "no"
                                    }))}>No</button>

                                    <button type="button" aria-pressed={answers[reviewItems.id] === "n/a"} className={answers[reviewItems.id] === "n/a" ? "selected-answer selected-na-btn" : ""} disabled={isReviewComplete}  onClick={() => setAnswers(previousAnswers => ({
                                        ...previousAnswers,
                                        [reviewItems.id]: "n/a"
                                    }))}>N/A</button>
                                    <div className="flag-outer-container">
                                        <button type="button" aria-pressed={flags[reviewItems.id]} className={flags[reviewItems.id] ? "flag-selected" : "no-flag-selected"} disabled={isReviewComplete} onClick={() => setFlags(flag => ({
                                            ...flag,
                                            [reviewItems.id] : !flag[reviewItems.id]
                                        }))} aria-label={flags[reviewItems.id] === false ? "Flag an issue" : "Remove flag"} title={flags[reviewItems.id] === false ? "Flag an issue" : "Remove flag"}>
                                            <Flag size={18} strokeWidth={1.8}/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="review-card-body">
                                <div className="supporting-evidence-section-wrapper">
                                    <h5 className="supporting-evidence-title">Supporting Evidence</h5>
                                    {supportingEvidence.length > 0 ? supportingEvidence.map((evidence) => {
                                        return (
                                            <section key={evidence.evidenceId} className="supporting-evidence-chip-container">
                                                <div className={"supporting-evidence-chip"}>
                                                    {evidence.evidenceId}-{evidence.platform}
                                                </div>
                                            </section>
                                        )
                                    }) : <span className="no-evidence-text">No supporting evidence linked to this question.</span>
                                    }
                                </div>

                                <div className="create-evidence-btn-container">
                                    <button type="button" className="create-evidence-gap-btn" disabled={isReviewComplete} onClick={() => {setActiveGapQuestionId(reviewItems.id); setGapTitle(""); setGapDescription(""); setRequestedEvidence(""); setTrackValidationError("");} }>+ Create evidence gap</button>
                                </div>

                                {activeGapQuestionId === reviewItems.id && isReviewComplete === false && (
                                    <div className="create-gap-card">
                                        {trackValidationError && (
                                            <p className="unfilled-out-field" role="alert">
                                                {trackValidationError}
                                            </p>
                                        )}
                                        <div className="create-gap-header-row">
                                            <div className="create-gap-header-left">
                                                <h5>
                                                    <Flag size={16} className="create-gap-flag-icon" />
                                                    Create Evidence Gap
                                                </h5>
                                                <p className="create-gap-subtitle">
                                                    Document missing or insufficient evidence for criterion {reviewItems.id}.
                                                </p>
                                            </div>
                                            <span className="create-gap-criterion-id">{reviewItems.id}</span>
                                        </div>
                                        <div className="create-gap-field-group">
                                            <label htmlFor="evidence-gap-title">Evidence Gap Title</label>
                                            <input
                                                id="evidence-gap-title"
                                                className="create-gap-input"
                                                value={gapTitle}
                                                placeholder="e.g. First-use notice timing not demonstrated"
                                                onChange={(event) => setGapTitle(event.target.value)}
                                            />

                                        </div>

                                        <div className="create-gap-field-group">
                                            <label htmlFor="evidence-gap-description">Evidence Gap Description</label>
                                            <textarea
                                                id="evidence-gap-description"
                                                className="create-gap-textarea description-textarea"
                                                value={gapDescription}
                                                placeholder="Explain what the submitted evidence does not establish..."
                                                onChange={(event) => setGapDescription(event.target.value)}
                                            />
                                        </div>

                                        <div className="create-gap-field-group">
                                            <label htmlFor="requested-evidence">Requested Evidence</label>
                                            <textarea
                                                id="requested-evidence"
                                                className="create-gap-textarea requested-textarea"
                                                value={requestedEvidence}
                                                placeholder="Describe the additional screenshots, recordings, or code needed..."
                                                onChange={(event) => setRequestedEvidence(event.target.value)}
                                            />
                                        </div>

                                        <div className="create-gap-actions-row">
                                            <button
                                                type="button"
                                                className="gap-action-btn btn-cancel"
                                                onClick={() => {
                                                    setActiveGapQuestionId(null);
                                                    setGapTitle("");
                                                    setGapDescription("");
                                                    setRequestedEvidence("");
                                                    setTrackValidationError("");
                                                }}>Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="gap-action-btn btn-submit"
                                                onClick={() => handleCreateGap()}
                                            >+ Create Gap
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <p className="selected-answer-text">Selected answer: {answers[reviewItems.id] ?? "Unanswered"}</p>

                                <textarea value={notes[reviewItems.id]} placeholder="Reviewer notes..." readOnly={isReviewComplete} onChange={(event) => setNotes(changeNotes =>({
                                    ...changeNotes,
                                    [reviewItems.id]: event.target.value
                                }))}/>
                            </div>

                        </article>
                    </section>
                )
            })}
        </section>
    )
}