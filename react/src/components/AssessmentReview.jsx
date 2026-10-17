import "./AssessmentReview.css"
import React, {useState} from "react";
import { Flag } from "lucide-react";

export default function AssessmentReview({record}) {
    const reviewQuestions = record.reviewQuestions ?? [];
    const [answers, setAnswers] = useState(() =>
        reviewQuestions.reduce((acc, question) => ({
            ...acc,
            [question.id]: question.answer
        }), {})
    );
    const [notes, setNotes] = useState(() =>
        reviewQuestions.reduce((acc, note) =>({
            ...acc,
            [note.id]: note.reviewerNotes ?? ""
        }), {})
    );

    const [flags, setFlags] = useState(() =>
        reviewQuestions.reduce((acc, flag) => ({
            ...acc,
            [flag.id]: flag.flagged ?? false
        }), {})
    );

    const totalQuestions = reviewQuestions.length;
    const answeredQuestions = (Object.values(answers).filter((actualQuestions) => actualQuestions !== null && actualQuestions !== undefined)).length;
    let progressPercentage = 0;

    if (totalQuestions !== 0) {
        progressPercentage = (answeredQuestions / totalQuestions) * 100;
    }



    return (
        <section>
            <h3>Auditor Review / Findings</h3>
            <p>{answeredQuestions} of {totalQuestions} answered</p>
            <div className="answered-questions-progress-track">
                <div
                    className="answered-questions-progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
                {reviewQuestions.map(reviewItems => {
                    const supportingEvidence = (record.evidence ?? []).filter(
                        (evidence) => (reviewItems.evidenceIds ?? []).includes(evidence.evidenceId))
                    return (
                        <article key={reviewItems.id}>
                            <h4>{reviewItems.label}</h4>
                            <p>{reviewItems.description}</p>
                            <div>
                                <h5>Supporting Evidence</h5>
                                {supportingEvidence.length > 0 ? supportingEvidence.map((evidence) => {
                                        return (
                                            <div key={evidence.evidenceId} className={"supporting-evidence-chip"}>
                                                {evidence.evidenceId} · {evidence.platform}

                                            </div>

                                        )
                                    }) : "No supporting evidence linked to this question."}

                            </div>

                            <div>
                                <button type="button" aria-pressed={answers[reviewItems.id] === "yes"} className={answers[reviewItems.id] === "yes" ? "selected-answer" : ""} onClick={() => setAnswers(previousAnswers => ({
                                    ...previousAnswers,
                                    [reviewItems.id]: "yes"
                                }))}>Yes</button>

                                <button type="button" aria-pressed={answers[reviewItems.id] === "no"} className={answers[reviewItems.id] === "no" ? "selected-answer" : ""} onClick={() => setAnswers(previousAnswers => ({
                                    ...previousAnswers,
                                    [reviewItems.id]: "no"
                                }))}>No</button>

                                <button type="button" aria-pressed={answers[reviewItems.id] === "n/a"} className={answers[reviewItems.id] === "n/a" ? "selected-answer" : ""}  onClick={() => setAnswers(previousAnswers => ({
                                    ...previousAnswers,
                                    [reviewItems.id]: "n/a"
                                }))}>N/A</button>

                                <button type="button" aria-pressed={flags[reviewItems.id]} className={flags[reviewItems.id] ? "flag-selected" : "no-flag-selected"} onClick={() => setFlags(flag => ({
                                    ...flag,
                                    [reviewItems.id] : !flag[reviewItems.id]
                                }))} aria-label={flags[reviewItems.id] === false ? "Flag an issue" : "Remove flag"} title={flags[reviewItems.id] === false ? "Flag an issue" : "Remove flag"}>
                                    <Flag size={18} strokeWidth={1.8}/>
                                </button>
                                <p>Selected answer: {answers[reviewItems.id] ?? "Unanswered"}</p>
                            </div>

                            <textarea value={notes[reviewItems.id]} placeholder="Reviewer notes..." onChange={(event) => setNotes(changeNotes =>({
                                ...changeNotes,
                                [reviewItems.id]: event.target.value
                            }))}/>

                        </article>
                        )
                })}

        </section>

    )
}