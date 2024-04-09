import environment from "./environment";
import { interval } from "rxjs";
import secApi from "./feature/secApi/secApi";
import datastoreGenerator, { Store } from "./feature/datastore/datastore";
import list from "./ticker-list";
import discordSecMesssager from "./feature/webhook/discordSecMessager";
import sendMessage from './feature/webhook/discordIntegration';
import app from "./express";

app; //Necessary

sendMessage(environment.healthCheckWebhook,[],"edgar-watcher starting up",[]).subscribe()
const main = () => {
    const datastores: Store[] = [];
    for (const ticker of list) {
        const store = datastoreGenerator(ticker);
        datastores.push(store);
    }

    interval(environment.intervalInMilliseconds).subscribe(() => {
        for (let store of datastores) {
            secApi.findCIK(store.getName()).subscribe(cik => {
                secApi.getSubmissions(cik).subscribe(submission => {
                    if (!store.compare(submission)) {
                        discordSecMesssager.postForm(submission, cik);
                    }
                    store.store(submission);
                })
            });
        }
    });
};

main();


export default main;
