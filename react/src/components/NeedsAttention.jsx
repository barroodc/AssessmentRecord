import "./NeedsAttention.css"

export default function NeedsAttention({missingPlatforms}) {

    const attentionCount = missingPlatforms.length;

    return (
        <section className="needs-attention-card">
            <h3 className="needs-attention-title">Needs Attention</h3>
            <p className="needs-attention-count">{attentionCount === 1 ? `${attentionCount} item needs attention` :
                attentionCount > 1 ? `${attentionCount} items need attention` : `No items need attention`}</p>
            <article>
                {missingPlatforms.length === 0 ? (
                    <p>No missing platform evidence</p>
                ) : (
                    missingPlatforms.map((missingPlat) => (
                        <div key={missingPlat} className="attention-row">
                            <div className="attention-row-content">
                                <span className="attention-icon">!</span>
                                <span className="attention-message">{missingPlat} evidence is missing</span>
                            </div>
                            <div className="attention-chevron">›</div>
                        </div>

                    ))
                )}
            </article>
        </section>
    )
}