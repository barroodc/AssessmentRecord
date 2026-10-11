import AssessmentHeader from "./AssessmentHeader.jsx"
import AssessmentTabs from "./AssessmentTabs.jsx";
import AssessmentOverview from "./AssessmentOverview.jsx";
import React from "react";

export default function AssessmentRecordPage({record, clearSelection}) {

    const [activeTab, setActiveTab] = React.useState("overview");
    const [isReviewerNotesOpen, setIsReviewerNotesOpen] = React.useState(false);
    return (
        <main>
            <AssessmentHeader record={record} clearSelection={clearSelection}/>
            <AssessmentTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            {activeTab === "overview" ? <AssessmentOverview record={record} setActiveTab={setActiveTab}/> :
                 activeTab === "evidence" ? "Submitted Evidence" :
                 activeTab === "review" ? "Auditor Review" : ""}
        </main>
    )
}