import "./AssessmentReview.css"
import React, {useState} from "react";

export default function AssessmentReview({record}) {
    const reviewQuestions = record.reviewQuestions ?? [];
    const [answers, setAnswers] = useState(() =>
        reviewQuestions.reduce((acc, question) => ({
            ...acc,
            [question.id]: question.answer
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
                    return (
                        <article key={reviewItems.id}>
                            <h4>{reviewItems.label}</h4>
                            <p>{reviewItems.description}</p>
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
                                <p>Selected answer: {answers[reviewItems.id] ?? "Unanswered"}</p>
                            </div>

                        </article>
                        )
                })}

        </section>

    )
}