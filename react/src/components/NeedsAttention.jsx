export default function NeedsAttention({missingPlatforms}) {
    return (
        <section>
            <h3>Needs Attention</h3>
            <article>
                {missingPlatforms.length === 0 ? (
                    <p>No missing platform evidence</p>
                ) : (
                    missingPlatforms.map((missingPlat) => (
                        <p key={missingPlat}>{missingPlat} evidence is missing</p>
                    ))
                )}
            </article>
        </section>
    )
}