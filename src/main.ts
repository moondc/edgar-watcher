import environment from "./environment";
import { interval, retry } from "rxjs";
import secApi from "./feature/secApi/secApi";
import datastoreGenerator, { Store } from "./feature/datastore/datastore";
import list from "./ticker-list";
import discordSecMesssager from "./feature/webhook/discordSecMessager";
import { Submission } from "./feature/secApi/model";
import { MGClient } from "moongoose-client";
import { DClient } from "discord-client";
import express, { Request, Response } from "express";

const app = express();
app.get('/healthcheck', (req: Request, res: Response) => {
    const status = { status: "up" }
    res.json(status);
    res.send();
});

app.listen(environment.port, () => {
    console.log(`Server is running on http://localhost:${environment.port}`);
});


MGClient.initialize({
    callsResetAfterMilliseconds: environment.serviceCallsResetInMilliseconds,
    maxCalls: environment.maxServiceCallsInARow
});


DClient.initialize(environment.serviceName, environment.healthCheckWebhook, environment.discordWebhook);
DClient.healthPost("starting up").subscribe();

const compareSubmission = (submission: Submission, store: Store, cik: number) => {
    if (!store.compare(submission)) {
        discordSecMesssager.postForm(submission, cik);
    }
    store.store(submission);
};

const handleError = (error: any) => {
    console.log(error);
    DClient.healthPost(error).subscribe();
};

const fetchSubmissions = (cik: number, store: Store) => {
    const observer = {
        next: (submission: Submission) => compareSubmission(submission, store, cik),
        error: handleError
    };
    secApi.getSubmissions(cik).pipe(retry(3)).subscribe(observer);
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
