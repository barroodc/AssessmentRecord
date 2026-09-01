class EmployeeProfileCard {
    constructor(employeeName, employeeTitle, joined, workStream, email, team, reportsTo, phone, message, isEmployeeOnline) {
        this.employeeName = employeeName;
        this.employeeTitle = employeeTitle;
        this.joined = joined;
        this.workStream = workStream;
        this.email = email;
        this.team = team;
        this.reportsTo = reportsTo;
        this.phone = phone;
        this.message = message;
        this.isEmployeeOnline = isEmployeeOnline;
    }

    getEmployeeName() {
        return this.employeeName;
    }

    getEmployeeTitle() {
        return this.employeeTitle;
    }

    getJoined() {
        return this.joined;
    }

    getWorkStream() {
        return this.workStream;
    }

    getEmail() {
        return this.email;
    }

    getTeam() {
        return this.team;
    }

    getReportsTo() {
        return this.reportsTo;
    }

    getPhone() {
        return this.phone;
    }

    getMessage() {
        return this.message;
    }

    getIsEmployeeOnline() {
        return this.isEmployeeOnline;
    }

}