export default function NextAction({nextAction, nextActionDescription}) {
    return (
        <section>
            <h3>Next Action</h3>
            <p>{nextAction}</p>
            <p>{nextActionDescription}</p>
        </section>
    )
}