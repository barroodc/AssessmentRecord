import MetricCard from "./MetricCard.jsx";

export default function Metrics() {
    return (
        <section>
            <MetricCard
                name="ACTIVE RECORDS"
                numberOfRecords = "13"
            />

            <MetricCard
                name="UNASSIGNED"
                numberOfRecords = "0"
            />

            <MetricCard
                name="HIGH RISK "
                numberOfRecords = "5"
            />

            <MetricCard
                name="PENDING RESPONSE"
                numberOfRecords = "2"
            />


        </section>
    )
}