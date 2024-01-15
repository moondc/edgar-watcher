import axios from 'axios';
import axiosWrapper from './axiosWrapper';

jest.mock('axios');
const axiosMock = (axios as jest.MockedFunction<typeof axios>)

jest.mock("../../environment", () => { return { maxCallsPerSecond: 3 } });
jest.useFakeTimers();

describe('axiosWrapper tests', () => {
    beforeEach(() => { jest.resetAllMocks(); })
    afterEach(() => { jest.runAllTimers(); })
    it('a get should return an observable', (done) => {
        axiosMock.mockResolvedValue({ data: "asdf" });
        axiosWrapper.get("https://facebook.com").subscribe(result => {
            expect(result).toEqual("asdf");
            done();
        });
    });

    it('a get should have a specific config', (done) => {
        axiosMock.mockResolvedValue({ data: "asdf" });
        axiosWrapper.get("https://facebook.com").subscribe(result => {
            expect(result).toEqual("asdf");
            expect(axiosMock.mock.calls[0][0]).toEqual({ method: 'get', url: 'https://facebook.com', headers: undefined })
            done();
        });
    });

    it('a get should pass headers to the downstream request', (done) => {
        axiosMock.mockResolvedValue({ data: "asdf" });
        const record: Record<string, string> = { "x-request": "value" };
        axiosWrapper.get("https://facebook.com", record).subscribe(result => {
            expect(result).toEqual("asdf");
            expect(axiosMock.mock.calls[0][0]).toEqual({ method: 'get', url: 'https://facebook.com', headers: record })
            done();
        });
    });

    it('a get should throw on axios error as an observable error', (done) => {
        const err = new Error("fake error");
        axiosMock.mockRejectedValue(err);
        const obs = {
            next: () => { },
            error: (error: any) => {
                expect(error).toEqual(err);
                done();
            }
        }
        axiosWrapper.get("https://facebook.com").subscribe(obs);
    });

    it('a post should return an observable', (done) => {
        axiosMock.mockResolvedValue({ data: "asdf" });
        axiosWrapper.post("https://facebook.com", { data: "qwer" }).subscribe(result => {
            expect(result).toEqual("asdf");
            done();
        });
    });

    it('a post should have a specific config', (done) => {
        axiosMock.mockResolvedValue({ data: "asdf" });
        axiosWrapper.post("https://facebook.com", { data: "qwer" }).subscribe(result => {
            expect(result).toEqual("asdf");
            expect(axiosMock.mock.calls[0][0]).toEqual({ method: 'post', url: 'https://facebook.com', headers: undefined, data: { data: "qwer" } })
            done();
        });
    });

    it('a post should pass headers to the downstream request', (done) => {
        axiosMock.mockResolvedValue({ data: "asdf" });
        const record: Record<string, string> = { "x-request": "value" };
        axiosWrapper.post("https://facebook.com", { data: "a" }, record).subscribe(result => {
            expect(result).toEqual("asdf");
            expect(axiosMock.mock.calls[0][0]).toEqual({ method: 'post', url: 'https://facebook.com', headers: record, data: { data: 'a' } })
            done();
        });
    });

    it('a post should throw on axios error as an observable error', (done) => {
        const err = new Error("fake error");
        axiosMock.mockRejectedValue(err);
        const obs = {
            next: () => { },
            error: (error: any) => {
                expect(error).toEqual(err);
                done();
            }
        }
        axiosWrapper.post("https://facebook.com", {}).subscribe(obs);
    });
});


describe('axiosWrapper concurrency tests', () => {
    beforeEach(() => { jest.resetAllMocks(); })
    afterEach(() => { jest.runAllTimers(); })

    // a simple function that helps determine when to call "done()"
    const areConcurrentCallsDoneGenerator = (number: Number) => {
        let current = 0;
        const num: Number = number;
        return (): boolean => {
            current++;
            return current === num
        }
    }

    it('should test my testing function', () => {
        const concurrentChecker = areConcurrentCallsDoneGenerator(3);
        for (let i = 0; i < 3; i++) {
            if (i < 2) {
                expect(concurrentChecker()).toBe(false);
            }
            else {
                expect(concurrentChecker()).toBe(true);
            }
        }
    });

    it("should make calls immediately if below the max conrrent allowed", (done) => {
        axiosMock.mockResolvedValue({ data: "asdf" });
        const concurrentChecker = areConcurrentCallsDoneGenerator(3);
        for (let i = 0; i < 3; i++) {
            axiosWrapper.get("https://facebook.com").subscribe(result => {
                expect(result).toEqual("asdf");
                concurrentChecker() && done();
            });
        }
    })

    it("should make calls wait to make calls after htting the max allowed per second", (done) => {
        axiosMock.mockResolvedValue({ data: "asdf" });
        const concurrentChecker = areConcurrentCallsDoneGenerator(10);
        for (let i = 0; i < 10; i++) {
            axiosWrapper.get("https://facebook.com").subscribe(result => {
                expect(result).toEqual("asdf");
                concurrentChecker() && done();
            });
        }
        expect(axiosMock.mock.calls.length).toBe(3);
        jest.runOnlyPendingTimers();
        expect(axiosMock.mock.calls.length).toBe(6);
        jest.runOnlyPendingTimers();
        expect(axiosMock.mock.calls.length).toBe(9);
        jest.runOnlyPendingTimers();
        expect(axiosMock.mock.calls.length).toBe(10);
    });


});

