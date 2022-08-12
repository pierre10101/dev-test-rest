const request = require("supertest");
const app = require("../app");
const db = require('../models/index')
const User = db.User;

it("It should response the GET method", async () => {
    return request(app)
        .get("/")
        .then(response => {
            expect(response.statusCode).toBe(200);
        });
});

describe("Test all Account Routes to see if they work", () => {
    it("It should respond with 200 and create a new user", async () => {
        await User.destroy({
            where: { email: 'testdfdfdf@example.com', test_user: true },
        })
        return request(app)
            .post("/api/auth/signup")
            .send({
                email: 'testdfdfdf@example.com',
                password: 'test123',
                test_user: true
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    it("It should respond with 400 as user is already taken!", async () => {
        return request(app)
            .post("/api/auth/signup")
            .send({
                email: 'testdfdfdf@example.com',
                password: 'test123'
            })
            .then(response => {
                expect(response.statusCode).toBe(400);
            });
    });

    it("It should respond with 200 and payload of jwt", async () => {
        return request(app)
            .post("/api/auth/signin")
            .send({
                email: 'testdfdfdf@example.com',
                password: 'test123'
            })
            .then(response => {
                expect(response.body.auth).toEqual(true)
                expect(response.statusCode).toBe(200);
            });
    });
});

describe("Test all Task Routes to see if they work", () => {

    it("It should respond with 200 and successfully created a task", async () => {
        const jwt = await request(app)
            .post("/api/auth/signin")
            .send({
                email: 'testdfdfdf@example.com',
                password: 'test123'
            });
        return request(app)
            .post("/api/task")
            .set('Authorization', `Bearer ${jwt.body.accessToken}`)
            .send({
                "title": "first132",
                "description": "test"
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    it("It should respond with 200 and retrieve all tasks for this user.", async () => {
        const jwt = await request(app)
            .post("/api/auth/signin")
            .send({
                email: 'testdfdfdf@example.com',
                password: 'test123'
            });
        return request(app)
            .get("/api/task")
            .set('Authorization', `Bearer ${jwt.body.accessToken}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    it("It should respond with 200 and update a particular task.", async () => {
        const jwt = await request(app)
            .post("/api/auth/signin")
            .send({
                email: 'testdfdfdf@example.com',
                password: 'test123'
            });
        const user = await request(app)
            .get("/api/task")
            .set('Authorization', `Bearer ${jwt.body.accessToken}`)
        return request(app)
            .put(`/api/task/${user.body.data[0].id}`)
            .send({
                title: 'Unit test',
                description: 'test'
            })
            .set('Authorization', `Bearer ${jwt.body.accessToken}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    it("It should respond with 200 and retrieve a particular task.", async () => {
        const jwt = await request(app)
            .post("/api/auth/signin")
            .send({
                email: 'testdfdfdf@example.com',
                password: 'test123'
            });
        const user = await request(app)
            .get("/api/task")
            .set('Authorization', `Bearer ${jwt.body.accessToken}`)
        return request(app)
            .get(`/api/task/${user.body.data[0].id}`)
            .set('Authorization', `Bearer ${jwt.body.accessToken}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    it("It should respond with 200 and delete a particular task.", async () => {
        const jwt = await request(app)
            .post("/api/auth/signin")
            .send({
                email: 'testdfdfdf@example.com',
                password: 'test123'
            });
        const user = await request(app)
            .get("/api/task")
            .set('Authorization', `Bearer ${jwt.body.accessToken}`)
        return request(app)
            .delete(`/api/task/${user.body.data[0].id}`)
            .set('Authorization', `Bearer ${jwt.body.accessToken}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });
})