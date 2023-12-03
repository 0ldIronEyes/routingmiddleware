process.env.NODE_ENV='test';
const request = require('supertest');

const app = require('app');

let items= require('fakeDb');

let item = { name: "thing", prince: 100 }

beforeEach(async() => {
    items.push(item);
});

afterEach(async()=>{
    items = [];
})

describe("GET /items", async function() {
    test("get list of items", async function() {
        const response = await request(app).get('/items');
        const { items } = response.body;
        expect(response.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });

});


describe("GET /items/:name", async function() {
    test("Get a certain item", async function() {
        const response = await request(app).get(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual(item);
    });

    test("Responds with 404 if can't find item", async function() {
        const response = await request(app).get('/items/0');
        expect(response.statusCode).toBe(404);
    });

})


describe("POST /items", async function() {
    test("Create a new item", async function() {
        const response = await request(app).post('/items').send(
            { name: 'ice cream', price: 20}
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toHaveProperty('name');
        expect(response.body.item.name).toEqual('ice cream');
        expect(response.boty.item.price).toEqual(20);
    });

})

describe("PATCH /items/:name", async function() {
    test("Update an item", async function() {
        const response = await response(app).patch(`/items/${item.name}`).send({name: "Donut"});
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual({name: "Donut"})
    });
})

describe("DELETE /items/:name", async function() {
    test("Deletes a single item", async function() {
        const response = await request(app).delete(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Deleted"});
    });
})