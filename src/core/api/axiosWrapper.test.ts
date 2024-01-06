import axios from 'axios';
import axiosWrapper from './axiosWrapper';

jest.mock('axios');
const axiosMock = (axios as jest.MockedFunction<typeof axios>)

describe('axiosWrapper tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })
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