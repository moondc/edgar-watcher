import apiHelper from "./apiHelper";
import { RecentFiling } from "./model";


describe("apiHelper tests", () => {
    it("should map recentFilingObjects into a filing array and sort it reverse chronologically", () => {
        const recentFiling: RecentFiling = {
            acceptanceDateTime: ["12/13/2024", "12/14/2024"],
            accessionNumber: ["1", "2"],
            filingDate: ["12/13/2024", "12/14/2024"],
            reportDate: ["12/13/2024", "12/14/2024"],
            act: ["1", "2"],
            form: ["1", "2"],
            fileNumber: ["1", "2"],
            filmNumber: ["1", "2"],
            items: ["1", "2"],
            size: [1, 2],
            isXBRL: [1, 2],
            isInlineXBRL: [1, 2],
            primaryDocument: ["1", "2"],
            primaryDocDescription: ["1", "2"],
        }
        const actual = apiHelper.fixFilingObjectAndSort(recentFiling);
        expect(actual[0].acceptanceDateTime).toBe("12/14/2024");
        expect(actual[0].accessionNumber).toBe("2");
        expect(actual[0].filingDate).toBe("12/14/2024");
        expect(actual[0].reportDate).toBe("12/14/2024");
        expect(actual[0].act).toBe("2");
        expect(actual[0].form).toBe("2");
        expect(actual[0].fileNumber).toBe("2");
        expect(actual[0].filmNumber).toBe("2");
        expect(actual[0].items).toBe("2");
        expect(actual[0].size).toBe(2);
        expect(actual[0].isXBRL).toBe(2);
        expect(actual[0].isInlineXBRL).toBe(2);
        expect(actual[0].primaryDocument).toBe("2");
        expect(actual[0].primaryDocDescription).toBe("2");
    });
});