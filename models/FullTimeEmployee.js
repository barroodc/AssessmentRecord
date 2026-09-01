class FullTimeEngineer{
    constructor(engineersUniqueID, firstName, lastName, profileImage, inOfficeStatus, title, team, email, reportsTo) {
        this.engineersUniqueID = engineersUniqueID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImage = profileImage;
        this.inOfficeStatus = inOfficeStatus;
        this.title = title;
        this.team = team;
        this.email = email;
        this.reportsTo = reportsTo;
    }

    getFTEngineersUniqueID() {
        return this.engineersUniqueID;
    }

    getFTEngineersFirstName() {
        return this.firstName;
    }

    getFTEngineersLastName() {
        return this.lastName;
    }

    getFTEngineersProfileImage() {
        return this.profileImage;
    }

    getFTEngineersOfficeStatus() {
        return this.inOfficeStatus;
    }

    getFTEngineersTitle() {
        return this.title;
    }

    getFTEngineersTeam() {
        return this.team;
    }

    getFTEngineersEmail() {
        return this.email;
    }

    getFTEngineersDirect
}