import "./AssessmentTabs.css"

export default function AssessmentTabs({activeTab, setActiveTab}) {
    return (
        <section>
            <nav className="active-tab">
                <button className={`tab-item overview-tab ${activeTab === "overview" ? "is-selected" : ""}`} onClick={() => setActiveTab("overview")}>Overview</button>
                <button className={`tab-item evidence-tab ${activeTab === "evidence" ? "is-selected" : ""}`} onClick={() => setActiveTab("evidence")}>Evidence</button>
                <button className={`tab-item evidence-tab ${activeTab === "review" ? "is-selected" : ""}`} onClick={() => setActiveTab("review")}>Review</button>
                <button className={`tab-item evidence-tab ${activeTab === "gapsAndActions" ? "is-selected" : ""}`} onClick={() => setActiveTab("gapsAndActions")}>Gaps & Actions</button>
            </nav>
        </section>
    )
}