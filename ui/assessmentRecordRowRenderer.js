export function renderAssessmentRecordRow({
                                              recordId,
                                              descriptionText,
                                              status,
                                              projectId,
                                              engineerName,
                                              engineerImage,
                                              auditorStatus,
                                              risk,
                                              createdDate,
                                              daysOnBoard,
                                              assignedAuditor,
                                              index
                                          }) {

    return `
        <article class="audit-row audit-grid">
            <div class="record-id">${recordId}</div>

            <div class="description-cell">
                <p>
                    ${descriptionText.length > 60
        ? descriptionText.substring(0, 60) + "..."
        : descriptionText}
                </p>

                ${descriptionText.length > 60 ? `
                    <button class="show-more-btn" data-index="${index}">
                        <span class="show-more-icon">&gt;</span> Show more
                    </button>
                ` : ''}
            </div>

            <div>
                <span class="active-status">
                    <span class="status-dot"></span>
                    ${status}
                </span>
            </div>

            <div class="project-id">${projectId}</div>

            <div class="person">
                <img
                    class="avatar eng-avatar"
                    data-eng-name="${engineerName}"
                    src="${engineerImage}"
                    alt="Eng assigned profile photo"
                >
                <span>${engineerName}</span>
            </div>

            <div>
                <span class="badge">${auditorStatus}</span>
            </div>

            <div>
                <span class="badge">${risk}</span>
            </div>

            <div class="date-cell">
                ${createdDate.toLocaleDateString("en-CA")}
            </div>

            <div>${daysOnBoard}</div>

            <div class="person">
                ${assignedAuditor ? `
                    <img
                        class="avatar auditor-avatar"
                        data-auditor-name="${assignedAuditor.getAuditorFullName()}"
                        src="${assignedAuditor.profileImage}"
                        alt="${assignedAuditor.getAuditorFullName()}'s profile photo"
                    >
                    <span>${assignedAuditor.getAuditorFullName()}</span>
                ` : `
                    <span class="unassigned-text">None</span>
                `}
            </div>
        </article>
    `;
}