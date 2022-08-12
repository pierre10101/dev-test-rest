require('dotenv').config()
const { hashPassword, verifyPasswordWithHash } = require('./hash-password.service')
const { checkDuplicateUserNameOrEmail } = require('./accounts.service')
const db = require("../models/index");
const User = db.User;
describe('Test whether the accounts service works', () => {
    it('should verify if a token works', async () => {
        const hashed = await hashPassword('test123')
        expect(await verifyPasswordWithHash(hashed,'test123')).toEqual(true);
    })
    it('should verify a duplicate user does exists in the database', async () => {
        const mockRequest = {
            body: {
                email: (await User.findOne()).dataValues.email,
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
        const status = await checkDuplicateUserNameOrEmail(mockRequest, mockResponse(),
            mockNext
        );
        expect(status).toBeDefined();
    })

    it('should verify a duplicate user does not exists in the database', async () => {
        const mockRequest = {
            body: {
                email: 'asdfawe349450asdf8ha34',
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
        const status = await checkDuplicateUserNameOrEmail(mockRequest, mockResponse(),
            mockNext
        );
        expect(status).not.toBeDefined();
    })
})