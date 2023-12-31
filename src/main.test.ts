// These are integration tests, test out
import request from 'supertest';
import app from './main';
import axiosWrapper from './core/api/axiosWrapper';
import { of } from 'rxjs';

jest.mock('./core/api/axiosWrapper');


describe('GET /', () => {
    it('responds with 200', async () => {
        jest.spyOn(axiosWrapper, "get").mockReturnValue(of(5));
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe("5");
    });
});
