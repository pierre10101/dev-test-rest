require('dotenv').config()
const { hashPassword, verifyPasswordWithHash } = require('./hash-password.service')
describe('Test whether the password hashing service works', () => {
    it('should return true if hash and password decrypt hashed password', async () => {
        const hashed = await hashPassword('test123')
        expect(await verifyPasswordWithHash(hashed,'test123')).toEqual(true);
    })
})