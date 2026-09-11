import Auditor, {allInstancesOfAuditorsCatalog} from "../models/Auditor.js";
import AssessmentRecord, {
    allInstancesOfAssessmentRecordsCatalog
} from "../models/AssessmentRecord.js";

import {allInstancesOfFullTimeEmployees, FullTimeEmployee} from "../models/FullTimeEmployee.js";



//Note: We are going to name our Launch Manager Service Atlas.


const assetPath = "../assets/FakePeople/";

export const auditorOne = new Auditor("307548758","Charlie", "Guzman",
    assetPath + "guzman_charles.jpg", "Active", true, "Technical Auditor",
    "charles_guzman@mycompany.com", "Ashley Robertson", "+1 6803933867", new Date(2019,6, 12),
    "Privacy Technical Auditing", "Privacy Evidence Review");
export const auditorTwo = new Auditor("196054197", "Keith", "Dickerson",
    assetPath + "dickerson_keith.jpg", "Active", true, "Technical Auditor",
    "dickerson_keith@mycompany.com", "Ashley Robertson", "+1 9832722666", new Date(2021, 11, 10),
    "Privacy Technical Auditing", "Privacy Evidence Review");
export const auditorThree = new Auditor("872774855", "Ashley", "Robertson",
    assetPath + "robertson_ashley.jpg", "Active", true, "Lead Technical Auditor",
    "robertson_ashley@mycompany.com", "Brian Cox", "+1 3059415010", new Date(2022,3,8),
    "Privacy Technical Auditing", "Privacy Evidence Review");
export const auditorFour = new Auditor("917622676", "Trevor", "Griffin",
    assetPath + "griffin_trevor.jpg", "Active", true, "Technical Auditor",
    "griffin_trevor@mycompany.com", "Ashley Robertson", "+1 2835442087", new Date(2024,7,17),
    "Privacy Technical Auditing", "Privacy Evidence Review");
export const auditorFive = new Auditor("601724248", "Amber", "Moss",
    assetPath + "moss_amber.jpg", "Active", true, "Technical Auditor",
    "moss_amber@mycompany.com", "Ashley Robertson", "+1 3052012442", new Date(2025,5,14),
    "Privacy Technical Auditing", "Privacy Evidence Review");

export const fteOne = new FullTimeEmployee("892968605", "Arnold", "Shultz",
    assetPath + "shultz_arnold.jpg", "Active", "Software Engineer", "Data Platform Infrastructure",
    "shultz_arnold@mycompany.com", "Marcus Vance", "+1 5057870571", new Date(2019, 3,13),
    "Cloud Foundations & Scale");

export const fteTwo = new FullTimeEmployee("803350500", "Tony", "Gifford", assetPath + "gifford_tony.jpg",
    "Active", "Software Engineer", "Core Monetization Systems", "gifford_tony@mycompany.com", "Elena Rostova", "+1 9072479555", new Date(2019,8,20),
    "Ads Revenue & Commerce");

export const fteThree = new FullTimeEmployee("808587381", "Jeffrey", "Powell", assetPath + "powell_jeffery.jpg",
    "Active", "Software Engineer", "Integrity Machine Learning", "powell_jeffery@mycompany.com", "Julian Thorne", "+1 2277377316", new Date(2019,11,14),
    "Trust, Safety & AI");

export const fteFour = new FullTimeEmployee("507724695", "Nathan", "Morgan", assetPath + "morgan_nathan.jpg",
    "Active", "Software Engineer", "Developer Productivity Tools", "morgan_nathan@mycompany.com", "Maya Lin", "+1 3052870818", new Date(2020, 2, 10),
    "Engineering Efficiency");

export const fteFive = new FullTimeEmployee("639439054", "Robert", "Kearns", assetPath + "robert_kearns.jpg",
    "Active", "Software Engineer", "Immersive Reality Core", "kearns_robert@mycompany.com", "Devante Brooks", "+1 9837914897", new Date(2020, 7, 15),
    "Workspaceverse & Spatial Computing");

export const fteSix = new FullTimeEmployee("877014864", "April", "Pullum", assetPath + "pullum_april.jpg",
    "Active", "Software Engineer", "Messaging Platform Services", "pullum_april@mycompany.com", "Chloe Davenport", "+1 3052262096", new Date(2020,10,15),
    "Consumer Communications");

export const fteSeven= new FullTimeEmployee("226485097", "Clara", "Phillips", assetPath + "phillips_clara.jpg",
    "Active", "Software Engineer", "Distributed Storage Engineering", "phillips_clara@mycompany.com", "Mateo Alvarez", "+1 5053134016", new Date(2021,4,8),
    "Core Infrastructure");

export const fteEight = new FullTimeEmployee("536290456", "Patricia", "Bisson", assetPath + "bisson_patricia.jpg",
    "Active", "Software Engineer", "Feed Ranking Algorithms", "bisson_patricia@mycompany.com", "Priya Nair", "+1 3052024739", new Date(2021,9,14),
    "Discovery & Recommendations");

export const fteNine = new FullTimeEmployee("787419668", "Cynthia", "Eley", assetPath + "eley_cynthia.jpg",
    "Active", "Software Engineer", "Enterprise Security Operations", "eley_cynthia@mycompany.com", "Samuel O'Connor", "+1 3016462497", new Date(2022,5,11),
    "Information Security");

export const fteTen = new FullTimeEmployee("398228860", "Rose", "Brewer", assetPath + "brewer_rose.jpg",
    "Active", "Software Engineer", "Growth Experiments Framework", "brewer_rose@mycompany.com", "Nadia Kalu", "+1 5056442654", new Date(2022,10,27),
    "User Growth & Acquisition");

export const fteEleven = new FullTimeEmployee("867589469", "Kathleen", "Pierre", assetPath + "pierre_kathleen.jpg",
    "Active", "Software Engineer", "Web Application Architecture", "pierre_kathleen@mycompany.com", "Lucas Moreau", "+1 5057112982", new Date(2023,2,17),
    "Frontend Foundations");

export const fteTwelve = new FullTimeEmployee("281925873", "Rebecca", "Smith", assetPath + "smith_rebecca.jpg",
    "Active", "Software Engineer", "Contextual Recommendations", "smith_rebecca@mycompany.com", "Harper Sterling", "+1 3646273693", new Date(2023, 8, 10),
    "Personalization & AI");

export const fteThirteen = new FullTimeEmployee("518500061", "Wendy", "Moser", assetPath + "moser_wendy.jpg",
    "Active", "Software Engineer", "Real-Time Collaboration", "moser_wendy@mycompany.com", "Jin-woo Park", "+1 4724078105", new Date(2023,11,14),
    "Workspace & Productivity");

export const fteFourteen = new FullTimeEmployee("894888506", "Veronica", "Collins", assetPath + "collins_veronica.jpg",
    "Active", "Software Engineer", "Video Streaming Infrastructure", "collins_veronica@mycompany.com", "Freja Lindstrom", "+1 9837285396", new Date(2024, 3, 20),
    "Media Delivery Systems");

export const fteFifteen = new FullTimeEmployee("271152906", "Arlo", "Kaufman", assetPath + "kaufman_arlo.jpg",
    "Active", "Software Engineer", "Network Protocols & Edge", "kauman_arlo@mycompany.com", "Darius Vance", "+1 3052711829", new Date(2025, 8, 18),
    "Global Backbone & Edge Computing");

//low risk
export const assessmentRecord0001 = new AssessmentRecord("AR0001", "The application displays a privacy policy link from the Settings page.",
    "Active", "AT177734","none", new Date(2026,5, 29), "Low", true, 5, "Arnold Schultz", assetPath + "shultz_arnold.jpg"
);
export const assessmentRecord0002 = new AssessmentRecord("AR0002", "The application displays a notice informing users that AI interactions may be used to improve AI models before first use.",
    "Active", "AT948133", "none", new Date(2026, 3, 25), "Low", true, 12, "Tony Gifford", assetPath + "gifford_tony.jpg");
export const assessmentRecord0003 = new AssessmentRecord("AR0003", "The application displays the End-to-End Encrypted label within the chat interface.",
    "In Progress", "AT742462", "none", new Date(2026,6,5), "Low", false, 0, "Jeffrey Powell", assetPath + "powell_jeffery.jpg");
export const assessmentRecord0004 = new AssessmentRecord("AR0004", "Users can access privacy settings from the Account Settings menu.",
    "Active","AT677009", "Re-submitted to Eng", new Date(2026,1,15), "Low", true, 57, "Nathan Morgan", assetPath + "morgan_nathan.jpg");
export const assessmentRecord0005 = new AssessmentRecord("AR0005", "The application displays contextual help text explaining why location permission is requested.",
    "Active", "AT364367", "Validated", new Date(2026, 2, 21), "Low", true, 4, "Robert Kearns", assetPath + "robert_kearns.jpg");

//medium risk
export const assessmentRecord0006 = new AssessmentRecord("AR0006", "Users can disable personalized advertising through Privacy Settings.",
    "Active", "AT492512", "none", new Date(2026, 4, 4), "Medium", true, 17, "April Pullum", assetPath + "pullum_april.jpg");
export const assessmentRecord0007 = new AssessmentRecord("AR0007", "The application stores notification preferences associated with the authenticated user account.",
    "Active", "AT688515", "none", new Date(2026, 3, 12), "Medium", true, 22, "Clara Phillips", assetPath + "phillips_clara.jpg");
export const assessmentRecord0008 = new AssessmentRecord("AR0008", "Only authenticated users can access their own privacy settings.",
    "Active", "AT786069", "none", new Date(2026, 2,2), "Medium", true, 27, "Patricia Bisson", assetPath + "bisson_patricia.jpg");
export const assessmentRecord0009 = new AssessmentRecord("AR0009", "The application honors the user's selected audience when publishing Stories.",
    "Active", "AT675164", "none", new Date(2026, 5, 27), "Medium", true, 45, "Cynthia Eley", assetPath + "eley_cynthia.jpg");
export const assessmentRecord0010 = new AssessmentRecord("AR0010", "The application only collects contact information after the user explicitly grants permission.",
    "In Progress", "AT311429", "none", new Date(2026,4,4), "Medium", false, 0, "Rose Brewer", assetPath + "brewer_rose.jpg");

//high risk
export const assessmentRecord0011 = new AssessmentRecord("AR0011", "Only authorized employees can access users' private messages through internal support tools.",
    "Active", "AT574830", "Pending Auditor Re-review", new Date(2026,4,5), "High", true, 30, "Kathleen Pierre", assetPath + "pierre_kathleen.jpg");
export const assessmentRecord0012 = new AssessmentRecord("AR0012", "The application permanently deletes user data following an approved account deletion request.",
    "Active", "AT706000", "Evidence Deficient", new Date(2026,1,1), "High", true, 52, "Rebecca Smith", assetPath + "smith_rebecca.jpg");
export const assessmentRecord0013 = new AssessmentRecord("AR0013", "The application only shares user location data with third-party partners after obtaining user consent.",
    "Active", "AT442258", "Retired", new Date(2026,3,2), "High", false, 24, "Wendy Moser", assetPath + "moser_wendy.jpg");
export const assessmentRecord0014 = new AssessmentRecord("AR0014", "The application encrypts user messages during transmission and while stored on our servers.",
    "Active", "AT658850", "none", new Date(2026, 5,5), "High", true, 27, "Veronica Collins", assetPath + "collins_veronica.jpg");
export const assessmentRecord0015 = new AssessmentRecord("AR0015", "The application prevents users from accessing another user's private content through authorization enforcement.",
    "Active", "AT593551", "none", new Date(2026, 3,12), "High", true, 27, "Arlo Kaufman", assetPath + "kaufman_arlo.jpg");

class mockData {

}

export const idsFromAllAssessmentRecords = [];
export const textFromAllAssessmentRecords = [];

export const statusFromAllAssessmentRecords = [];

export const projectIDForAllAssessmentRecords = [];

export const engEmployeeProfilePicsFromAllAssessmentRecords = [];

export const namesOfEngineersAssignedFromAllAssessmentRecords = [];

export const auditorStatusFromAllAssessmentRecords = [];

export const riskLevelFromAllAssessmentRecords = [];

export const createdDateFromAllAssessmentRecords = [];

export const daysOnAuditBoardFromAllAssessmentRecords  = [];


for (const record of allInstancesOfAssessmentRecordsCatalog) {
    idsFromAllAssessmentRecords.push(record.assessmentRecordID);
    textFromAllAssessmentRecords.push(record.assessmentRecordText);
    statusFromAllAssessmentRecords.push(record.status);
    projectIDForAllAssessmentRecords.push(record.projectID);
    engEmployeeProfilePicsFromAllAssessmentRecords.push(record.engProfileImage);
    namesOfEngineersAssignedFromAllAssessmentRecords.push(record.engContactAssigned);
    auditorStatusFromAllAssessmentRecords.push(record.auditorStatus);
    riskLevelFromAllAssessmentRecords.push(record.riskLevel);
    createdDateFromAllAssessmentRecords.push(record.createdDate);
    daysOnAuditBoardFromAllAssessmentRecords.push(record.daysOnAuditBoard);
}


 export const auditorFullNames = allInstancesOfAuditorsCatalog.map((auditor) => {
    return `${auditor.firstName} ${auditor.lastName}`
})


for (let i = 0; i < 15; i++) {
    console.log(auditorFullNames[i]);
}

export default mockData;