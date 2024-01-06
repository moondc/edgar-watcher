import axios, { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';

function makeRequest<Type>(config: AxiosRequestConfig): Observable<Type> {
    const obs = new Observable<Type>(handle => {
        axios(config).then(res => {
            handle.next(res.data);
        }).catch(err => {
            handle.error(err);
        }).finally(() => {
            handle.complete()
        });
    })
    return obs;
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
