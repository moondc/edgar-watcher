import axios, { AxiosRequestConfig } from 'axios';
import { from, throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

function makeRequest(config: AxiosRequestConfig): Observable<any> {
    return from(axios(config)).pipe(
        catchError(error => {
            return throwError(() => error);
        })
    );
}

export default {
    get: (url: string, headers?: Record<string, string>) => makeRequest({
        method: 'get',
        url,
        headers,
    }),
    post: (url: string, data: any, headers?: Record<string, string>) => makeRequest({
        method: 'post',
        url,
        data,
        headers,
    })
    // Add more methods as needed
};
