import environment from "./environment";
import { interval } from "rxjs";
import secApi from "./feature/secApi/secApi";
import datastoreGenerator, { Store } from "./feature/datastore/datastore";
import list from "./ticker-list";
import discordSecMesssager from "./feature/webhook/discordSecMessager";
import sendMessage from './feature/webhook/discordIntegration';
import app from "./express";
import { Submission } from "./feature/secApi/model";

app; //Necessary

sendMessage(environment.healthCheckWebhook, [], "edgar-watcher starting up", []).subscribe()
const compareSubmission = (submission: Submission, store: Store, cik: number) => {
    if (!store.compare(submission)) {
        discordSecMesssager.postForm(submission, cik);
    }
    store.store(submission);
};

const handleError = (error: any) => {
    sendMessage(environment.healthCheckWebhook, [], error, []).subscribe();
};

const fetchSubmissions = (cik: number, store: Store) => {
    const observer = {
        next: (submission: Submission) => compareSubmission(submission, store, cik),
        error: handleError
    };
    secApi.getSubmissions(cik).subscribe(observer);
};

const checkUpdates = (store: Store) => {
    secApi.findCIK(store.getName()).subscribe({
        next: cik => fetchSubmissions(cik, store),
        error: handleError
    });
};

const main = () => {
    const tickerStores = list.map(ticker => datastoreGenerator(ticker));
    interval(environment.intervalInMilliseconds).subscribe({
        next: () => tickerStores.forEach(checkUpdates),
        error: handleError
    });
};

main();


export default main;
