import {allInstancesOfFullTimeEmployees} from "../models/FullTimeEmployee.js";
import {auditorAssignments} from "../models/testModels.js";
import {allInstancesOfAuditorsCatalog} from "../models/Auditor.js";

export class employeeProfileCards {
    static employeeProfilesOnDashboard() {
        let fteProfilePics = document.querySelectorAll(".eng-avatar");

        for (let i = 0; i < fteProfilePics.length; i++) {
            const profileImage = fteProfilePics[i];

            let hideTimeout;
            let cardContainer = null;

            profileImage.addEventListener("mouseover", (event) => {

                clearTimeout(hideTimeout);

                if (!cardContainer) {
                    cardContainer = document.createElement("div");
                    cardContainer.className = "employeeCard";
                }

                const hoveredName = event.target.getAttribute('data-eng-name') || event.target.alt || "";

                const employee = allInstancesOfFullTimeEmployees.find(emp => {
                    const fullName = `${emp.firstName} ${emp.lastName}`.trim();
                    const cleanHovered = hoveredName.trim().toLowerCase();

                    return fullName === cleanHovered || emp.firstName?.toLowerCase() === cleanHovered ||
                        cleanHovered.includes(emp.firstName?.toLowerCase());
                });

                if (employee) {
                    cardContainer.innerHTML = `
                <div class="employeeCardHeader"></div>

                <section class="employeeIdentitySection">

                    <div class="employeeProfileImageContainer">

                        <img
                            class="employeeProfileImage"
                            src="${employee.profileImage}"
                            alt="${employee.firstName} ${employee.lastName}"
                        >

                        <span
                            class="employeeStatusIndicator ${getEmployeeStatusClass(employee.inOfficeStatus)}"
                            title="${getEmployeeStatusText(employee.inOfficeStatus)}">
                        </span>

                    </div>

                    <div class="employeeNameAndTitle">
                        <h1>${employee.firstName} ${employee.lastName}</h1>
                        <p>${employee.title}</p>
                    </div>

                </section>

                <section class="employeeDetails">

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/clock-4.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">TENURE</p>
                            <p class="employeeDetailValue">
                                ${employee.joinedDate}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/users.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">TEAM</p>
                            <p class="employeeDetailValue">
                                ${employee.team}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/layers.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">WORK STREAM</p>
                            <p class="employeeDetailValue">
                                ${employee.workStream}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/user-round-pen.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">REPORTS TO</p>
                            <p class="employeeDetailValue">
                                ${employee.reportsTo}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/mail.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">EMAIL</p>
                            <p class="employeeDetailValue">
                                ${employee.email}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/phone.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">PHONE</p>
                            <p class="employeeDetailValue">
                                ${employee.phone}
                            </p>
                        </div>
                    </div>

                </section>

                <section class="employeeContactMethods">

                    <button class="contactButton primaryContactButton">
                        <img
                            src="../assets/ProfileCardIcons/mail.svg"
                            alt=""
                        >
                        <span>Email</span>
                    </button>

                    <button class="contactButton">
                        <img
                            src="../assets/ProfileCardIcons/phone.svg"
                            alt=""
                        >
                        <span>Call</span>
                    </button>

                    <button class="contactButton">
                        <img
                            src="../assets/ProfileCardIcons/message-square.svg"
                            alt=""
                        >
                        <span>Message</span>
                    </button>

                </section>
            `;
                }

                document.body.appendChild(cardContainer);

                cardContainer.style.position = "absolute";
                cardContainer.style.zIndex = "1000";
                cardContainer.style.left = event.pageX + 15 + "px";
                cardContainer.style.top = event.pageY + 15 + "px";

                cardContainer.addEventListener("mouseover", () => {
                    clearTimeout(hideTimeout);
                });

                cardContainer.addEventListener("mouseleave", () => {
                    startHideTimer();
                });

            });


            function startHideTimer() {

                clearTimeout(hideTimeout);

                hideTimeout = setTimeout(() => {

                    if (cardContainer) {
                        cardContainer.remove();
                        cardContainer = null;
                    }

                }, 400);
            }


            function getEmployeeStatusClass(status) {

                if (!status) {
                    return "offline";
                }

                const normalizedStatus = status
                    .toString()
                    .trim()
                    .toLowerCase();

                switch (normalizedStatus) {

                    case "online":
                    case "available":
                    case "active":
                        return "online";

                    case "away":
                        return "away";

                    case "offline":
                        return "offline";

                    case "afterhours":
                    case "after hours":
                    case "outside working hours":
                    case "outside of available working hours":
                        return "afterHours";

                    default:
                        return "offline";
                }
            }
        }


        function getEmployeeStatusText(status) {

            if (!status) {
                return "Offline";
            }

            const normalizedStatus = status
                .toString()
                .trim()
                .toLowerCase();

            switch (normalizedStatus) {

                case "online":
                case "available":
                case "active":
                    return "Available";

                case "away":
                    return "Away";

                case "offline":
                    return "Offline";

                case "afterhours":
                case "after hours":
                case "outside working hours":
                case "outside of available working hours":
                    return "Outside of Available Working Hours";

                default:
                    return "Status Unknown";
            }
        }

    }

    static auditorProfilesOnDashboard() {
        let auditorProfilePics = document.querySelectorAll('.auditor-avatar');

        for (let i = 0; i < auditorProfilePics.length; i++) {
            const profileImage = auditorProfilePics[i];

            let hideTimeout;
            let cardContainer = null;

            profileImage.addEventListener("mouseover", (event) => {

                clearTimeout(hideTimeout);

                if (!cardContainer) {
                    cardContainer = document.createElement("div");
                    cardContainer.className = "employeeCard";
                }

                const hoveredName = event.target.getAttribute('data-auditor-name') || event.target.alt || "";

                const auditor = allInstancesOfAuditorsCatalog.find(auditorInCatalog => {
                    const fullName = `${auditorInCatalog.firstName} ${auditorInCatalog.lastName}`.trim();
                    return fullName === hoveredName.trim() || auditorInCatalog.firstName === hoveredName.trim();
                })

                if (auditor) {
                    cardContainer.innerHTML = `
                <div class="employeeCardHeader"></div>

                <section class="employeeIdentitySection">

                    <div class="employeeProfileImageContainer">

                        <img
                            class="employeeProfileImage"
                            src="${auditor.profileImage}"
                            alt="${auditor.firstName} ${auditor.lastName}"
                        >

                        <span
                            class="employeeStatusIndicator ${getEmployeeStatusClass(auditor.inOfficeStatus)}"
                            title="${getEmployeeStatusText(auditor.inOfficeStatus)}">
                        </span>

                    </div>

                    <div class="employeeNameAndTitle">
                        <h1>${auditor.firstName} ${auditor.lastName}</h1>
                        <p>${auditor.title}</p>
                    </div>

                </section>

                <section class="employeeDetails">

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/clock-4.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">TENURE</p>
                            <p class="employeeDetailValue">
                                ${auditor.joinedDate}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/users.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">TEAM</p>
                            <p class="employeeDetailValue">
                                ${auditor.team}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/layers.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">WORK STREAM</p>
                            <p class="employeeDetailValue">
                                ${auditor.workStream}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/user-round-pen.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">REPORTS TO</p>
                            <p class="employeeDetailValue">
                                ${auditor.reportsTo}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/mail.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">EMAIL</p>
                            <p class="employeeDetailValue">
                                ${auditor.email}
                            </p>
                        </div>
                    </div>

                    <div class="employeeDetail">
                        <div class="employeeDetailIcon">
                            <img
                                src="../assets/ProfileCardIcons/phone.svg"
                                alt=""
                            >
                        </div>

                        <div>
                            <p class="employeeDetailLabel">PHONE</p>
                            <p class="employeeDetailValue">
                                ${auditor.phone}
                            </p>
                        </div>
                    </div>

                </section>

                <section class="employeeContactMethods">

                    <button class="contactButton primaryContactButton">
                        <img
                            src="../assets/ProfileCardIcons/mail.svg"
                            alt=""
                        >
                        <span>Email</span>
                    </button>

                    <button class="contactButton">
                        <img
                            src="../assets/ProfileCardIcons/phone.svg"
                            alt=""
                        >
                        <span>Call</span>
                    </button>

                    <button class="contactButton">
                        <img
                            src="../assets/ProfileCardIcons/message-square.svg"
                            alt=""
                        >
                        <span>Message</span>
                    </button>

                </section>
            `;
                }

                document.body.appendChild(cardContainer);

                cardContainer.style.position = "absolute";
                cardContainer.style.zIndex = "1000";
                cardContainer.style.left = event.pageX + 15 + "px";
                cardContainer.style.top = event.pageY + 15 + "px";

                cardContainer.addEventListener("mouseover", () => {
                    clearTimeout(hideTimeout);
                });

                cardContainer.addEventListener("mouseleave", () => {
                    startHideTimer();
                });

            });

            function startHideTimer() {

                clearTimeout(hideTimeout);

                hideTimeout = setTimeout(() => {

                    if (cardContainer) {
                        cardContainer.remove();
                        cardContainer = null;
                    }

                }, 400);
            }

            function getEmployeeStatusClass(status) {

                if (!status) {
                    return "offline";
                }

                const normalizedStatus = status
                    .toString()
                    .trim()
                    .toLowerCase();

                switch (normalizedStatus) {

                    case "online":
                    case "available":
                    case "active":
                        return "online";

                    case "away":
                        return "away";

                    case "offline":
                        return "offline";

                    case "afterhours":
                    case "after hours":
                    case "outside working hours":
                    case "outside of available working hours":
                        return "afterHours";

                    default:
                        return "offline";
                }
            }

            function getEmployeeStatusText(status) {

                if (!status) {
                    return "Offline";
                }

                const normalizedStatus = status
                    .toString()
                    .trim()
                    .toLowerCase();

                switch (normalizedStatus) {

                    case "online":
                    case "available":
                    case "active":
                        return "Available";

                    case "away":
                        return "Away";

                    case "offline":
                        return "Offline";

                    case "afterhours":
                    case "after hours":
                    case "outside working hours":
                    case "outside of available working hours":
                        return "Outside of Available Working Hours";

                    default:
                        return "Status Unknown";
                }
            }

        }
    }
}

