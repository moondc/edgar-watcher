import environment from "../../environment";
import apiHelper from "../secApi/apiHelper";
import { Submission } from "../secApi/model";
import sendMessage from "./discordIntegration";

function postForm(submission: Submission, cik: number) {
    const filingsArr = apiHelper.fixFilingObjectAndSort(submission.filings.recent);
    const latestFiling = filingsArr[0];
    const deets = [cik, latestFiling.accessionNumber.replaceAll("-", ""), latestFiling.primaryDocument];
    const docUrl = "https://www.sec.gov/Archives/edgar/data/" + deets.join('/');
    sendMessage(environment.discordWebhook, ["everyone"], "New " + latestFiling.form, [docUrl]).subscribe();
}

export default { postForm };