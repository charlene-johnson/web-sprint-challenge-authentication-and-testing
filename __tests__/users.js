const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

afterAll(async () => {
    await db.destroy()
})

describe("User authentication testing", () => {
    it("POST /api/auth/register", async() => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({username:"Char", password:"123456"})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("Char")
    })

    it("POST /api/auth/register-Error when creating same user", async() => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({username:"Char", password: "123456"})
            expect(res.statusCode).toBe(409)
            expect(res.type).toBe("application/json")
    })
    it("POST /api/auth/login", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({username:"Char", password: "123456"})
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
    })
    it("POST /api/auth/login-Error when using the wrong login", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({username:"Cha", password: "1234"})
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })
})