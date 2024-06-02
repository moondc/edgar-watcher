import apiHelper from "../secApi/apiHelper";
import { Submission } from "../secApi/model";
import { DClient } from "discord-client";
import environment from "./../../environment";

function postForm(submission: Submission, cik: number) {
    const filingsArr = apiHelper.fixFilingObjectAndSort(submission.filings.recent);
    const latestFiling = filingsArr[0];
    const deets = [cik, latestFiling.accessionNumber.replaceAll("-", ""), latestFiling.primaryDocument];
    const docUrl = "https://www.sec.gov/Archives/edgar/data/" + deets.join('/');
    DClient.statusPost(["everyone"], "New " + latestFiling.form, [docUrl]).subscribe(() => {
        DClient.postXhrAsEmbed(docUrl, { "User-Agent": environment.userAgent }).subscribe();
    });
}

export default { postForm };