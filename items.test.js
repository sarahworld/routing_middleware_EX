process.env.NODE_ENV = "test";

const supertest = require("supertest")

const app = require("./app")

const items = require("./fakeDb");
const { request } = require("express");

let item = {name:"candy", price:4.99}

beforeEach(async ()=>{
    items.push(item)
});

afterEach( ()=>{
    items.length = 0;
});

describe("GET /items",async () =>{
    test("Testing items on GET request", async()=>{
        const response = await request(app).get("/items")
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toEqual(1)
    })

    test("Testing for error", async()=>{
        const response = await request(app).get("/items/1")
        expect(response.statusCode).toBe(404)
    })
})

describe("GET /items/:name",async () =>{
    test("Testing items on GET request", async()=>{
        const response = await request(app).get(`/items/${item.name}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.item).toBe(item)
    })
})



describe("POST /items",async () =>{
    test("Testing items on POST request", async()=>{
        const response = await request(app).post("/items").send({name:"lollipop", price:6.99})
        expect(response.statusCode).toBe(201)
        expect(response.body.length).toEqual(2)
    })
})


describe("PATCH /items/:name",async () =>{
    test("Testing items on PATCH request", async()=>{
        const response = await request(app).patch("/items").send({name:"Orange Juice"})
        expect(response.statusCode).toBe(201)
        expect(response.body.item).toBe({edtItem:{name:"Orange Juice"}})
    })
})

describe("DELETE /items/:name",async () =>{
    test("Testing items on DELETE request", async()=>{
        const response = await request(app).get(`/items/${item.name}`)
        expect(response.statusCode).toBe(20)
        expect(response.body).toEqual({message:"Deleted"})
    })
})