import "./AssessmentReview.css"
import React, {useState} from "react";
import { Flag } from "lucide-react";

export default function AssessmentReview({record, setCreatedGaps, answers, setAnswers,
                                             notes, setNotes, flags, setFlags, totalQuestions, answeredQuestions, progressPercentage}) {
    const reviewQuestions = record.reviewQuestions ?? [];

    const [activeGapQuestionId, setActiveGapQuestionId] = useState(null);

    const [gapTitle, setGapTitle] = useState("");

    const [gapDescription, setGapDescription] = useState("");

    const [requestedEvidence, setRequestedEvidence] = useState("");


    function handleCreateGap() {
        if (gapTitle.trim() === "" || gapDescription.trim() === "" || requestedEvidence.trim() === "") {
            alert("please complete all fields");
            return
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

        console.log(newGap);
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

                                <button type="button" onClick={() => {setActiveGapQuestionId(reviewItems.id); setGapTitle(""); setGapDescription(""); setRequestedEvidence("");} }>+ Create evidence gap</button>

                                {activeGapQuestionId === reviewItems.id && <div>
                                    <h5>Create Evidence Gap</h5>
                                    <p>Creating a gap for {reviewItems.id}</p>
                                    <button type="button" onClick={() =>{setActiveGapQuestionId(null); setGapTitle(""); setGapDescription(""); setRequestedEvidence("");}}>Cancel</button>
                                    <label htmlFor="evidence-gap-title">Evidence Gap Title</label>
                                    <input id={"evidence-gap-title"} value={gapTitle} placeholder="Describe the evidence gap" onChange={(event) => setGapTitle(event.target.value)}/>
                                    <label htmlFor="evidence-gap-description">Evidence Gap Description</label>
                                    <textarea id="evidence-gap-description" value={gapDescription} placeholder="Explain what evidence is missing..." onChange={(event) => setGapDescription(event.target.value)}/>
                                    <label htmlFor="requested-evidence">Requested Evidence</label>
                                    <textarea id="requested-evidence" value={requestedEvidence} onChange={(event) => setRequestedEvidence(event.target.value)}/>
                                    <button type="button" onClick={() => handleCreateGap()}>Create Gap</button>
                                </div>}

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