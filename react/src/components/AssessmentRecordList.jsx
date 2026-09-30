function AssessmentRecordList() {
    return (
        <section>
            <table>
                <thead>
                <tr>
                    <th scope="col">Record ID</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Project ID</th>
                    <th scope="col">Eng Contact</th>
                    <th scope="col">Auditor Status</th>
                    <th scope="col">Risk</th>
                    <th scope="col">Created</th>
                    <th scope="col">Days on Board</th>
                    <th scope="col">Assigned Auditor</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">AR0001</th>
                    <td>The application displays a privacy policy link from the Settings page.</td>
                    <td>Active</td>
                    <td>AT177734</td>
                    <td>Arnold Schultz</td>
                    <td>none</td>
                    <td>Low</td>
                    <td>2026-06-29</td>
                    <td>5</td>
                    <td>Charlie Guzman</td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default AssessmentRecordList;