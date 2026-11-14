import "./AssessmentHeader.css"
import { MoveLeft } from 'lucide-react';

export default function AssessmentHeader({record, clearSelection}) {
    return (
        <header>
            <div className="assessment-record-header-bar">
                <p className="assessment-record-symbol">AR</p>
                <div className="assessment-record-header-bar-title">
                    <p className="auditlens-compliance-title">Auditlens Compliance</p>
                    <p className="assessment-record-name">AssessmentRecords</p>
                </div>
            </div>
            <section className="assessment-metadata-card">
                <div className="assessment-metadata-card-header-top">
                    <div className="assessment-metadata-card-header-top-left">
                        <p className="assessment-record-id">{record.assessmentRecordId}</p>
                        <p className="status">{record.status}</p>
                    </div>
                    <div className="assessment-metadata-card-header-top-right">
                        <button className="back-to-dashboard-button" onClick={() => clearSelection(null)}>  <MoveLeft />Back to Dashboard</button>
                    </div>
                </div>

                <h3 className="risk-category">{record.riskCategory}</h3>
                <p className="assessment-record-text">{record.assessmentRecordText}</p>
                <hr></hr>
                <div className="assessment-metadata-card-header-bottom">
                    <p className="project-id">Project: {record.projectId}</p>
                    <p className="risk-level">Risk Level: {record.riskLevel}</p>
                </div>
            </section>
        </header>
    )
}