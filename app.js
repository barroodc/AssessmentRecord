/*
Audit Tracker v1

Purpose:
Auditors need to have a place to go where they can easily search up their assigned Assessment Records. 

Primary User: Auditors will have a place where they can search for Assessment Reports to work on. 

Main Features: You will be able to search for assignments by auditor. You can tell what status each Assignment Record is in.
You will also be able to see others assignments as well. It will serve as a dashboard for all auditors.

Future Features:
1.) Search functionality
2.) Filtering logic
3.) Communication on the backend with a pool of Assessment Records for assignage 
*/





//This in the future should definitely be stored in a database like MySQL.
//This is especially true if we plan on creating a lot of dummy account entries and names for the dashboard.

// ===== DATA =====
const auditors = [
    {firstName: "Christopher", lastName: "Barrood", idNumber: 847562, auditsCompleted: 57},
    {firstName: "Ashima", lastName: "Yahoo", idNumber: 293715, auditsCompleted: 34},
    {firstName: "Blake", lastName: "Chodemeiser", idNumber: 408657, auditsCompleted: 14}
];

const auditorAssignmentBoard = [

]

const threshHoldAmountPerDayOfAudits = 10;

    // ===== DOM ELEMENTS =====
    const inputFieldForAddingAudits = document.getElementById('addAuditsInputField');
    const addAuditButton  = document.getElementById('addAuditsButton');
    const additionalAuditsUIRendered = document.getElementById('additionalAudits');

//Adds additional auditors to the auditors object. This then syncs with the current session.
function addAdditionalAuditors() {
    let auditorFirstName = document.getElementById("addAuditorFirstName").value;
    let auditorLastName = document.getElementById("addAuditorLastName").value;
    let auditorIDNumber = document.getElementById("addAuditorID").value;
    auditors.push({
        firstName: auditorFirstName,
        lastName: auditorLastName,
        idNumber: auditorIDNumber,
        auditsCompleted: 0
    });
      document.getElementById("addAuditorFirstName").value = "";
    document.getElementById("addAuditorLastName").value = "";
    document.getElementById("addAuditorID").value = "";
}


//For adding additional audits to every auditor
addAuditButton.addEventListener("click", function() {
        const auditsToAddFromInputField = inputFieldForAddingAudits.value;
        additionalAuditsUIRendered.innerText = auditsToAddFromInputField;
        auditors.forEach((auditor) => {
            auditor.auditsCompleted += Number(auditsToAddFromInputField);
        });
    });

//Removed auditors from the auditor object. This affects the auditors shown on the UI in session only. 
function removeAuditor() {
    let auditorIDNumberToRemove = Number(document.getElementById("idNumberOfAuditorToRemove").value);
    for (let i = auditors.length - 1; i >= 0; i--) {
        if (auditors[i].idNumber === auditorIDNumberToRemove) {
            auditors.splice(i, 1);
        }
    }
}

// ===== RENDER / DISPLAY =====

//Getter that retrieves full names of all auditors. This is displayed on the UI.
function getFullNamesOfAllAuditors() {
    let firstNameAndLastName = [];
    auditors.forEach((auditor) => {
        firstNameAndLastName.push(`${auditor.firstName} ${auditor.lastName}`);
    })
    document.getElementById("auditors").innerHTML = firstNameAndLastName.join('<br>');
}

//Gets a snapshot of the stats of the auditors that includes name, id, and number of audits completed. This is displayed on the UI.
function auditorQuickStats() {
    let auditorStatsArray = [];
    auditors.forEach((auditor) => {
        auditorStatsArray.push("Name: " + auditor.firstName + " " + auditor.lastName + " | ID Number:"  + auditor.idNumber + " | Audits Completed:" + 
            auditor.auditsCompleted
        );
    });
    document.getElementById("auditorStatsDisplay").innerText = auditorStatsArray.join('\n');
}


// ===== METRICS / ANALYTICS =====

//Getter function that gets the complete number of audits from all auditors. This then reflects on the UI.
function getTotalAudits() {
    let totalAudits = 0;
    auditors.forEach((auditor) => {
        totalAudits += auditor.auditsCompleted;
    });
    document.getElementById("resultOfTotalAudits").textContent = totalAudits;
}

//Getter function that gets the average audits out of the total audits completed amongst all auditors. This is then displayed on the UI.
function getAverageAudits() {
    let totalAudits = 0;
    let totalAuditors = auditors.length;
    auditors.forEach((numberOfAuditsCompleted) => {
        totalAudits += numberOfAuditsCompleted.auditsCompleted;
    });

    document.getElementById("avgAudits").textContent = totalAudits / totalAuditors;
}


// ===== PERFORMANCE =====
//I may want to look into setting this up on a week by week basis.
//The reason I am saying that is because we may want to track weekly performance. Or even daily performance.
//Same logic applies for getWhoHasTheLeastAuditsCompleted.

//Getter function that shows who is the top auditor depending upon the number of audits completed. This is displayed on the UI.
function getWhoHasTheMostAuditsCompleted() {
    let mostAuditsCount = auditors[0].auditsCompleted;
    for (let i = 0; i < auditors.length; i++) {
        if (auditors[i].auditsCompleted > mostAuditsCount) {
            mostAuditsCount = auditors[i].auditsCompleted;
        }
    }
    let topProducers = [];
    for (let j = 0; j < auditors.length; j++) {
        if (auditors[j].auditsCompleted === mostAuditsCount) {
            topProducers.push(auditors[j].firstName);
        }
    }
    document.getElementById("topAuditor").innerText = topProducers.join('\n');
}

//Getter function that shows who is the weakest auditor which is determined upon the lowest number of audits completed.
function getWhoHasTheLeastAuditsCompleted() {
    let leastAuditsCount = auditors[0].auditsCompleted;
    for (let i = 0; i < auditors.length; i++) {
        if (auditors[i].auditsCompleted < leastAuditsCount) {
            leastAuditsCount = auditors[i].auditsCompleted;
        }
    }
    let bottomProducers = [];
    for (let j = 0; j < auditors.length; j++) {
        if (auditors[j].auditsCompleted === leastAuditsCount) {
            bottomProducers.push(auditors[j].firstName);
        }
    }
    return bottomProducers.join('\n');
}

// ===== THRESHOLD / FILTERING =====


//This should probably be on average. So this again may require database access.
//Getter function that retrieves auditors firstnames who are below the threshold of 50 audits a week.
function getAuditorsBelowThreshold() {
    let auditorsBelowThreshold = [];
    //assuming this is for the weekly count
    auditors.forEach((auditor) => {
        if (auditor.auditsCompleted < (threshHoldAmountPerDayOfAudits * 5)) {
            auditorsBelowThreshold.push(auditor.firstName);
        }
    });
    return auditorsBelowThreshold;
}


// ===== SEARCH / LOOKUP =====

//I should consider the scenario where multiple auditors may have the same first and last name. So an ID number would set them apart.
//In the future I may want to pull all data from a database but for now we will pull the hardcoded values from the auditor object.

//Finds the auditor by first/last name and id.
function findAuditorsByNameAndID(auditorFirstName, auditorLastName, auditorID) {
    for (let i = 0; i < auditors.length; i++) {
        if (auditors[i].firstName === auditorFirstName && auditors[i].lastName === auditorLastName && auditors[i].idNumber === auditorID) {
            return `${auditors[i].firstName} ${auditors[i].lastName} | ID Number: ${auditors[i].idNumber}`;
        }
    }
}

//Finds auditors strictly by id number. If an auditor does not exist it displays Auditor Not Found. This is displayed on the UI. 
function findAuditorByIDNumber() {
    let idSearchInput = document.getElementById('idNumber').value;
    for (let i = 0; i < auditors.length; i++) {
        if (auditors[i].idNumber === Number(idSearchInput)) {
            //return `${auditors[i].firstName} ${auditors[i].lastName}`;
            document.getElementById("auditorFoundByID").innerText = `${auditors[i].firstName} ${auditors[i].lastName}`
            return
        }
    }
    document.getElementById("auditorFoundByID").innerText = "Auditor Not Found";
}



// ===== INVENTORY / FUTURE FEATURES =====


function amountOfEvidenceReportsInInventory() {
    //This again will require a mock database to pull info from.
}

/*
 Future improvements:

 1.) Local Storage -  for data needs to persist indefinitely across browser sessions
 2.) Database integration
 3.) Better validation
 4.) Remove duplicate rendering logic
 5.) Search improvements
*/


/*
What data does an auditor need?
FYI -> Assessment Record is the same as Evidence Report. I am just anonymizing it.

All of these would be required (The order in which they are presented on the UI can vary):

1.) ID number of Assessment Record 
2.) ID number of Project that the Assessment Record belongs to
3.) Status of Assessment Record (Verified, Insufficient Evidence, Review is Delayed, Pending Tech Audit Review, Cancelled)
4.) Assigned Auditor name and profile picture.
5.) Assigned Date
6.) Assessment Record Creation Date
7.) A way to filter by auditor so they can see their own tasks instead of their tasks mixed in with everyone elses.
8.) Filter by assigned date
9.) Filter by Assessment Record Creation Date
10.) Filter by status of Assessment Record
11.) Filter by ID number of Project that the Assessment Record belongs to.
12.) How many days have elapsed since it was added to the audit board 
13.) The name of the Assessment Record Statment (Can be truncated with a see more option)
14.) Assigned ProofOwner and name
15.) Presents a High Risk (Yes or No)
16.) Auditor tagging currently applied
17.) There should be a search bar at the top with a drop down menu of various searchable items (Assigned Date, Assignee, Assessment Record Status, etc).
18.) A nice to have would also be in the search bar if it showed the amount of Assessment Records in total from the result. Also to have a default number set (the current total number on the board)
19.) A multiselect option where a manager can select multiple Assessment Records at once and assign them to a specific Auditor.
*/




/*
One additional thought is that Auditors wouldn't be able to override the assignment of Assessment Records. Only their managers
would be able to do that. So possibly we would have some additional functionality gated for the managers only.

Auditors themselves should not be able to assign directly on the dashboard themselves an Assessment Recrod. It wouldn't stop
them from actually assigning to the actual Assessment Record UI but they wouldn't be able to do this on the dashboard.
This is again, a functionality reserved for their managers. 

So this would mean that theres probably going to be a lot of getter functions for the auditors view since they can only really filter
or see the data on the dasboard as opposed to be able to mutate it. So for example, they would be able to getCurrentAssessmentRecordsAssigned()
but not setCurrentAssessmentRecordsAssigned().

Im going to need to changeup some terminology so that it doesn't look exactly like what we have internally.
*/
/*
Auditor

Properties: employeeUniqueID, firstName, lastName, profileImage, inOfficeStatus, onAssignmentBoard, assessmentRecords = []
Methods:
1.) We can make getter functions for all of the individual properites. 
2.) getAssessmentRecordsAssignedToAssignee()
3.) removeAuditorFromBoard()
4.) addAuditorToBoard()

AssessmentRecord

Properties: assessmentRecordID, assessmentRecordText, assignedAuditor, status, projectID, 
createdDate, risk, auditorTagApplied, proofOwner, assignedDate, calendarDaysElapsed
Methods:
1.) We can make getter functions for all of the individual properites. 
2.) updateAssignedAuditor()
3.) updateStatus()
4.) updateRisk()
5.) updateAuditorTagApplied()
6.) updateProofOwner()
7.) updateAssignedDate()
8.) updateCalendarDaysElapsed

Project
Since we are just creating a dashboard theres really only one item related to project and thats the projectID. 
We probably dont need this for this dashboard that we are making. 
*/

/*
Project
    contains many AssessmentRecords

AssessmentRecord
    belongs to one Project

AssessmentRecord
    assigned to one Auditor

Auditor
    can have many AssessmentRecords
*/





