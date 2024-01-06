import sendMessage from "./feature/webhook/discordIntegration";
import environment from "./environment";
import { interval } from "rxjs";
import secApi from "./feature/secApi/secApi";
import apiHelper from "./feature/secApi/apiHelper";

// read configuration
const app = () => {
    sendMessage(environment.discordWebhook, ["everyone"], "Test", ["https://nootnoot.net"]);
    interval(environment.intervalInMilliseconds).subscribe(() => {

        // fetch new data
        // store latest data
        // compare data
        // send notification
    });
};

//app();
secApi.findCIK("AMC").subscribe(res => {
    secApi.getSubmissions(res).subscribe(submission => {
        const filingsArr = apiHelper.fixFilingObjectAndSort(submission.filings.recent);
    })
});
export default app;