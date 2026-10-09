import Header from "./Header.jsx";
import Metrics from "./Metrics.jsx";
import {Filter, Search} from "./SearchAndFilters.jsx";
import AssessmentRecordList from "./AssessmentRecordList.jsx";
import React from "react";
import data from "../data.json";
import AssessmentRecordPage from "./AssessmentRecordPage.jsx";



export default function Dashboard() {

    const [search, setSearch] = React.useState("");
    const [selectedAssessmentRecord, setSelectedAssessmentRecord] = React.useState(null);
    const selectedRecord = data.find((assessRecs) => assessRecs.assessmentRecordId === selectedAssessmentRecord);

    return (
        <>
            <Header/>
            {selectedRecord ? <AssessmentRecordPage record={selectedRecord} clearSelection={setSelectedAssessmentRecord}/> : <main>
                <h1>Assessment Records</h1>
                <p>Track active assessment records assigned to you and your peers.</p>
                <Metrics />
                <Search searchFields={search} searchUpdate={setSearch}/>
                <Filter />
                <AssessmentRecordList search={search} selectAssessmentRecord={setSelectedAssessmentRecord}/>
            </main>}


        </>

    )
}