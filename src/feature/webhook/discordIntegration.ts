import { Observable } from "rxjs";
// import axiosWrapper from "../../core/api/axiosWrapper";
import { MGClient } from "moongoose-client";
import { generateMessage } from "./discordMessageFormatter";
const sendMessage = (endpoint: string, users: string[], message: string, urls: string[]): Observable<any> => {
    const content = generateMessage(users, message, urls);
    return MGClient.post(endpoint, { "content": content });
}


export default sendMessage;