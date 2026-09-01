
/*
The Auditors are not full time employees. They are contingent workers.
This class is to represent the full time employees at the assigned company.
 */

import {allInstancesOfAssessmentRecordsCatalog} from "./AssessmentRecord.js";

export const allInstancesOfFullTimeEmployees = [];

export class FullTimeEmployee {
    constructor(employeesUniqueID, firstName, lastName, profileImage, inOfficeStatus, title, team, email, reportsTo, phone,
                joinedDate, workStream) {
        this.employeesUniqueID = employeesUniqueID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImage = profileImage;
        this.inOfficeStatus = inOfficeStatus;
        this.title = title;
        this.team = team;
        this.email = email;
        this.reportsTo = reportsTo;
        this.phone = phone;
        this.joinedDate = joinedDate;
        this.workStream = workStream;
        allInstancesOfFullTimeEmployees.push(this);
    }

    getJoinedDate() {
        return this.joinedDate;
    }

    getAllFullTimeEmployees() {
        return allInstancesOfFullTimeEmployees;
    }


    getFTEmployeesUniqueID() {
        return this.employeesUniqueID;
    }

    getFTEmployeesFirstName() {
        return this.firstName;
    }

    getFTEmployeesLastName() {
        return this.lastName;
    }

    getFTEmployeesProfileImage() {
        return this.profileImage;
    }

    getFTEmployeesOfficeStatus() {
        return this.inOfficeStatus;
    }

    getFTEmployeesTitle() {
        return this.title;
    }

    getFTEmployeesTeam() {
        return this.team;
    }

    getFTEmployeesEmail() {
        return this.email;
    }

    getFTEmployeesManager() {
        return this.reportsTo;
    }

    getFTEmployeesPhoneNumber() {
        return this.phone;
    }
}