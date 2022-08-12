require('dotenv').config()
const { checkDuplicateTask } = require('./tasks.service')
const db = require("../models/index");
const Task = db.Task;
describe('Test checkDuplicateTask Method', () => {
    it('returns 400 if duplicate found', async () => {
        const mockRequest = {
            body: {
                title: (await Task.findOne()).dataValues.title,
            },
        }
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
        const mockNext = () => {
            return ''
        }
        const status = await checkDuplicateTask(mockRequest, mockResponse(),
            mockNext
        );
        expect(status).toBeDefined();
    })
    it('continues the script if no duplicate found', async () => {
        const mockRequest = {
            body: {
                title: '111111234gsD4^&##ER'
            },
        }
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
        const mockNext = () => {
            return ''
        }
        const status = await checkDuplicateTask(mockRequest, mockResponse(),
            mockNext
        );
        expect(status).not.toBeDefined();
    })
})