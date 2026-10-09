export default function MetricCard({name, numberOfRecords}) {
    return(
        <article>
            <p>{name}</p>
            <p>{numberOfRecords}</p>
        </article>
    )
}