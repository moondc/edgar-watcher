import { Observable } from "rxjs";
import environment from "../../environment";
import defaultTickerList from "./defaultTickerList";
import axiosWrapper from "./../../core/api/axiosWrapper";
import { Submission } from "./model";

const headers = {
    "User-Agent": environment.userAgent,
    "Accept-Encoding": "gzip, deflate",
};

const findCIK = (ticker: string): Observable<number> => {
    const obs = new Observable<number>(handle => {
        const result = findCikByTicker(ticker);
        if (result) handle.next(result);
        if (!result) handle.error(new Error("Couldn't find Ticker - Please update the list"))
        handle.complete();
    })

    return obs;
}

const findCikByTicker = (tickerToSearch: string): number | null => {
    for (const key in defaultTickerList) {
        if (defaultTickerList.hasOwnProperty(key)) {
            const company = defaultTickerList[key];
            if (company.ticker === tickerToSearch) {
                return company.cik_str;
            }
        }
    }
    return null;
}

const getSubmissions = (cik: number): Observable<Submission> => {
    const newCik = leftFillZeroes(cik.toString(), 10);
    const url = "https://data.sec.gov/submissions/CIK" + newCik + ".json"
    return axiosWrapper.get(url, headers)
}

const leftFillZeroes = (input: string, length: number): string => {
    const zeroesToFill = length - input.length;
    const zeroPadding = "0".repeat(zeroesToFill);
    return zeroPadding + input;
}

export default { findCIK, getSubmissions };