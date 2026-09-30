export function Search() {
    return (
        <section>
            <label htmlFor="site-search">Search the dashboard:</label>
            <input
                className="search-input"
                type="search"
                placeholder="Search by record ID, project, auditor, or description..."
            />
        </section>
    )
}

export function Filter() {
    return (
        <section>
            <select className="filter-select" id="project-filter">
                <option>All projects</option>
            </select>

            <select className="filter-select" id="risk-filter">
                <option>All Risk</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>

            <select className="filter-select" id="status-filter">
                <option>All auditor statuses</option>
                <option>Validated</option>
                <option>Pending Auditor Re-review</option>
                <option>Evidence Deficient</option>
                <option>Retired</option>
                <option>Returned for Review</option>
                <option>None</option>
            </select>
        </section>
    )
}


