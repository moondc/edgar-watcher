// import secApi from "./secApi";
// import axiosWrapper from "../../core/api/axiosWrapper";
// import { Submission } from "./model";
// import { of } from "rxjs";

// jest.mock("../../core/api/axiosWrapper", () => ({
//     __esModule: true,
//     default: {
//         get: jest.fn(),
//     }
// }));
// const axiosWrapperMock = (axiosWrapper as jest.MockedFunction<any>)

// jest.mock("./defaultTickerList", () => ({
//     "0": {
//         "cik_str": 320193,
//         "ticker": "AAPL",
//         "title": "Apple Inc."
//     },
//     "1": {
//         "cik_str": 789019,
//         "ticker": "MSFT",
//         "title": "MICROSOFT CORP"
//     },
//     "2": {
//         "ticker": "QWER",
//         "title": "MICROSOFT CORP"
//     },
// }));

describe("secApi.findCIK tests", () => {
    // afterEach(() => {
    //     jest.clearAllMocks();
    // });
    it("delete me", () => {

    });

    // it("findCIK should return CIK from hardcoded data if it exists in the object", (done) => {
    //     const obs = {
    //         next: (res: number) => {
    //             expect(res).toBe(320193);
    //             done();
    //         }
    //     }
    //     secApi.findCIK("AAPL").subscribe(obs);
    // });

    // it("findCIK should error out if CIK is not in list", (done) => {
    //     const obs = {
    //         next: (res: number) => { },
    //         error: (error: any) => {
    //             expect(error.message).toBe("Couldn't find Ticker - Please update the list");
    //             done();
    //         }
    //     }
    //     secApi.findCIK("AAAA").subscribe(obs);
    // });

    // it("findCIK should error out if TICKER is matched but CIK property doesn't exist", (done) => {
    //     const obs = {
    //         next: (res: number) => { },
    //         error: (error: any) => {
    //             expect(error.message).toBe("Couldn't find Ticker - Please update the list");
    //             done();
    //         }
    //     }
    //     secApi.findCIK("QWER").subscribe(obs);
    // });
});

describe("secApi.getSubmissions tests", () => {
    // afterEach(() => {
    //     jest.clearAllMocks();
    // });

    // it("findCIK should return CIK from hardcoded data if it exists in the object", (done) => {
    //     axiosWrapperMock.get.mockReturnValue(of(17))
    //     const obs = {
    //         next: (res: Submission) => {
    //             expect(res).toBe(17);
    //             expect(axiosWrapperMock.get.mock.calls[0][0]).toBe("https://data.sec.gov/submissions/CIK0000001234.json");
    //             done();
    //         }
    //     }
    //     secApi.getSubmissions(1234).subscribe(obs);
    // });
});