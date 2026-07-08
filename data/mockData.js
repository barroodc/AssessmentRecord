import Auditor from "../models/Auditor.js";
import AssessmentRecord from "../models/AssessmentRecord.js";

//Note: We are going to name our Launch Manager Service Atlas.

export const auditorOne = new Auditor("307548758","Christopher", "Barrood",
    "barroodChristopher.jpg", "Active", true);
export const auditorTwo = new Auditor("196054197", "Blake", "Dickerson",
    "dickersonBlake.jpg", "Active", true);
export const auditorThree = new Auditor("872774855", "Ashima", "Yahoo",
    "yahooAshima.jpg", "Active", true);
export const auditorFour = new Auditor("917622676", "Trevor", "Griffin",
    "griffinTrevor.jpg", "Active", true);
export const auditorFive = new Auditor("601724248", "Amber", "Reed",
    "reedAmber.jpg", "Active", true);

//low risk
export const assessmentRecord0001 = new AssessmentRecord("AR0001", "The application displays a privacy policy link from the Settings page.",
    "Active", "AT177734","none", new Date(2026,5, 29), "Low", true, 5);
export const assessmentRecord0002 = new AssessmentRecord("AR0002", "The application displays a notice informing users that AI interactions may be used to improve AI models before first use.",
 "Active", "AT948133", "none", new Date(2026, 3, 25), "Low", true, 12);
export const assessmentRecord0003 = new AssessmentRecord("AR0003", "The application displays the End-to-End Encrypted label within the chat interface.",
    "In Progress", "AT742462", "none", new Date(2026,6,5), "Low", false, 0);
export const assessmentRecord0004 = new AssessmentRecord("AR0004", "Users can access privacy settings from the Account Settings menu.",
    "Pending Auditor Review","AT677009", "Returned for Review", new Date(2026,1,15), "Low", true, 57);
export const assessmentRecord0005 = new AssessmentRecord("AR0005", "The application displays contextual help text explaining why location permission is requested.",
    "Active", "AT364367", "Validated", new Date(2026, 2, 21), "Low", true, 4);

//medium risk
export const assessmentRecord0006 = new AssessmentRecord("AR0006", "Users can disable personalized advertising through Privacy Settings.",
    "Active", "AT492512", "none", new Date(2026, 4, 4), "Medium", true, 17);
export const assessmentRecord0007 = new AssessmentRecord("AR0007", "The application stores notification preferences associated with the authenticated user account.",
    "Active", "AT688515", "none", new Date(2026, 3, 12), "Medium", true, 22);
export const assessmentRecord0008 = new AssessmentRecord("AR0008", "Only authenticated users can access their own privacy settings.",
    "Active", "AT786069", "none", new Date(2026, 2,2), "Medium", true, 27);
export const assessmentRecord0009 = new AssessmentRecord("AR0009", "The application honors the user's selected audience when publishing Stories.",
    "Active", "AT675164", "none", new Date(2026, 5, 27), "Medium", true, 45);
export const assessmentRecord0010 = new AssessmentRecord("AR0010", "The application only collects contact information after the user explicitly grants permission.",
    "In Progress", "AT311429", "none", new Date(2026,4,4), "Medium", false, 0);

//high risk
export const assessmentRecord0011 = new AssessmentRecord("AR0011", "Only authorized employees can access users' private messages through internal support tools.",
    "Active", "AT574830", "Pending Submitter Response", new Date(2026,4,5), "High", true, 30);
export const assessmentRecord0012 = new AssessmentRecord("AR0012", "The application permanently deletes user data following an approved account deletion request.",
    "Active", "AT706000", "Evidence Deficient", new Date(2026,1,1), "High", true, 52);
export const assessmentRecord0013 = new AssessmentRecord("AR0013", "The application only shares user location data with third-party partners after obtaining user consent.",
    "Active", "AT442258", "Retired", new Date(2026,3,2), "High", false, 24);
export const assessmentRecord0014 = new AssessmentRecord("AR0014", "The application encrypts user messages during transmission and while stored on our servers.",
    "Active", "AT658850", "none", new Date(2026, 5,5), "High", true, 27);
export const assessmentRecord0015 = new AssessmentRecord("AR0015", "The application prevents users from accessing another user's private content through authorization enforcement.",
    "Active", "AT593551", "none", new Date(2026, 3,12), "High", true, 27);

class mockData {



}
export default mockData;

