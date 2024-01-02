import { Observable } from "rxjs";
import axiosWrapper from "../../core/api/axiosWrapper";
import { generateMessage } from "./discordMessageFormatter";
const sendMessage = (endpoint: string, users: string[], message: string, urls: string[]): Observable<any> => {
    const content = generateMessage(users, message, urls);
    return axiosWrapper.post(endpoint, { "content": content });
}


export default sendMessage;