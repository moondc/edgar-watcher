import environment from "./environment";
import { interval } from "rxjs";
import secApi from "./feature/secApi/secApi";
import datastoreGenerator, { Store } from "./feature/datastore/datastore";
import list from "./ticker-list";
import discordSecMesssager from "./feature/webhook/discordSecMessager";

console.log("Script is running");

const app = () => {
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

app();


export default app;
