export default function AssessmentTabs({activeTab, setActiveTab}) {
    return (
        <section>
            <nav>
                <button onClick={() => setActiveTab("overview")}>Overview</button>
                <button onClick={() => setActiveTab("evidence")}>Evidence</button>
                <button onClick={() => setActiveTab("review")}>Review</button>
                <button onClick={() => setActiveTab("gapsAndActions")}>Gaps & Actions</button>
            </nav>
        </section>
    )
}