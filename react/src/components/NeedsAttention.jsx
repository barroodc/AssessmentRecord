import "./NeedsAttention.css"
import { CircleDashed } from "lucide-react";
import { CircleAlert } from "lucide-react";

export default function NeedsAttention({missingPlatforms, setActiveTab, openGaps}) {

    const attentionCount = missingPlatforms.length + openGaps.length;

    return (
        <section className="needs-attention-card">
            <h3 className="needs-attention-title">Needs Attention</h3>
            <p className="needs-attention-count">{attentionCount === 1 ? `${attentionCount} item needs attention` :
                attentionCount > 1 ? `${attentionCount} items need attention` : `No items need attention`}</p>
            <article>
                {attentionCount === 0 ? (
                    ""
                ) : (
                    missingPlatforms.map((missingPlat) => (
                        <button key={missingPlat} type="button" className="attention-row" onClick={() => setActiveTab("evidence")}>
                            <div className="attention-row-content">
                                <span className="attention-icon"><CircleDashed size={16} className="attention-icon"/></span>
                                <span className="attention-message">{missingPlat} evidence is missing</span>
                            </div>
                            <div className="attention-chevron">›</div>
                        </button>
                    ))
                )}
                    {openGaps.length > 0 ? <button type="button" className="attention-row" onClick={() => setActiveTab("gapsAndActions")}>
                        <div className="attention-row-content">
                            <span className="attention-icon"><CircleAlert size={16} className="attention-icon" /></span>
                            <span className="attention-message">{openGaps.length > 1 ?
                                `${openGaps.length} evidence gaps remain open` : `${openGaps.length} evidence gap remains open`}</span></div><div className="attention-chevron">›</div></button> : ""}

            </article>
        </section>
    )
}