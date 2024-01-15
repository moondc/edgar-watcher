import axios, { AxiosRequestConfig } from 'axios';
import { Observable, mergeMap, timer } from 'rxjs';

import environment from '../../environment';

let callsWithinLastSecond = 0;

function makeRequest<Type>(config: AxiosRequestConfig): Observable<Type> {
    if (canMakeServiceCall()) {
        callsWithinLastSecond++;
        setTimeout(() => { callsWithinLastSecond-- }, 1000);
        return new Observable<Type>(handle => {
            axios(config).then(res => {
                handle.next(res.data);
            }).catch(err => {
                handle.error(err);
            }).finally(() => {
                handle.complete()
            });
        })
    }
    else {
        return timer(250).pipe(
            mergeMap((a: any) => {
                return makeRequest<Type>(config)
            }));
    }
}

function canMakeServiceCall(): boolean {
    if (callsWithinLastSecond < environment.maxCallsPerSecond) {
        return true;
    }
    return false
}

export default {
    get: <Type>(url: string, headers?: Record<string, string>): Observable<Type> => makeRequest<Type>({
        method: 'get',
        url,
        headers,
    }),
    post: <Type>(url: string, data: any, headers?: Record<string, string>): Observable<Type> => makeRequest<Type>({
        method: 'post',
        url,
        data,
        headers,
    })
    // Add more methods as needed
};
