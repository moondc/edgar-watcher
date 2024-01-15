import discordSecMessager from "./discordSecMessager";
import sendMessage from "./discordIntegration";
import apiHelper from "../secApi/apiHelper";
import { Filing } from "../secApi/model";
import { Observable, of } from "rxjs";

jest.mock('../secApi/apiHelper', () => ({
    fixFilingObjectAndSort: jest.fn(),
}));
const apiHelperMock = (apiHelper as jest.MockedFunction<any>)

jest.mock("./discordIntegration", () => { return jest.fn() });
const discordIntegrationMock = (sendMessage as jest.MockedFunction<any>)

jest.mock("../../environment", () => { return { discordWebhook: "https://discordTest" } });

describe("discordSecMessager tests", () => {
    it("should store a name on object creation", () => {
        apiHelperMock.fixFilingObjectAndSort.mockReturnValue([filing]);
        discordIntegrationMock.mockReturnValue(of(0));

        discordSecMessager.postForm(sub, 123);

        const calledArgs = discordIntegrationMock.mock.calls[0]
        expect(calledArgs[0]).toBe("https://discordTest");
        expect(calledArgs[1]).toStrictEqual(['everyone']);
        expect(calledArgs[2]).toBe('New 1');
        expect(calledArgs[3]).toStrictEqual(['https://www.sec.gov/Archives/edgar/data/123/1/1']);
    });
});

const filing: Filing = {

    accessionNumber: "1",
    filingDate: "1",
    reportDate: "1",
    acceptanceDateTime: "1",
    act: "1",
    form: "1",
    fileNumber: "1",
    filmNumber: "1",
    items: "1",
    size: 1,
    isXBRL: 1,
    isInlineXBRL: 1,
    primaryDocument: "1",
    primaryDocDescription: "1"

}

const sub: any = {
    filings: {
        recent: {
            accessionNumber: ["1,2"],
            filingDate: ["1,2"],
            reportDate: ["1,2"],
            acceptanceDateTime: ["1,2"],
            act: ["1,2"],
            form: ["1,2"],
            fileNumber: ["1,2"],
            filmNumber: ["1,2"],
            items: ["1,2"],
            size: [1, 2],
            isXBRL: [1, 2],
            isInlineXBRL: [1, 2],
            primaryDocument: ["1,2"],
            primaryDocDescription: ["1,2"]
        }
    }
}