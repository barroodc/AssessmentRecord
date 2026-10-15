import React, {useState} from "react";

export default function AssessmentReview({record}) {
    const reviewQuestions = record.reviewQuestions ?? [];
    const [answers, setAnswers] = useState(() =>
        reviewQuestions.reduce((acc, question) => ({
            ...acc,
            [question.id]: question.answer
        }), {})
    );

    return (
        <section>
            <h3>Auditor Review / Findings</h3>

                {reviewQuestions.map(reviewItems => {
                    return (
                        <article key={reviewItems.id}>
                            <h4>{reviewItems.label}</h4>
                            <p>{reviewItems.description}</p>
                            <div>
                                <button type="button">Yes</button>
                                <button type="button">No</button>
                                <button type="button">N/A</button>
                            </div>
                        </article>
                        )
                })}

        </section>

    )
}