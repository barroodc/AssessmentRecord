import Header from "./Header.jsx";
import Metrics from "./Metrics.jsx";
import {Filter, Search} from "./SearchAndFilters.jsx";
import AssessmentRecordList from "./AssessmentRecordList.jsx";

function Dashboard() {
    return (
        <>
            <Header/>
            <main>
                <h1>Assessment Records</h1>
                <p>Track active assessment records assigned to you and your peers.</p>
                <Metrics />
                <Search />
                <Filter />
                <AssessmentRecordList/>
            </main>

        </>

    )
}

export default Dashboard;