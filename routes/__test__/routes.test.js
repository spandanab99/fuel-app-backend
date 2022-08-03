const { app, server } = require('../../index');
const { mongoose, connectToDb } = require('../../db/db');
const request = require('supertest');
const PORT = 8000;

let token = ""
let id = ""
let  randomEmail = (Math.random() + 1).toString(32).substring(7);
describe('Fuel API', function() {

    afterAll(done => {
        mongoose.connection.close();
        server.close();
        done();
    });

    it('checks db connection', async function() {
        const testConnection = await connectToDb();
        expect(testConnection).toBeDefined();
	});
	  
	it('should register', async function() {
        const res = await request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({ email: randomEmail + '@gmail.com', password: '12345' })
    		
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toEqual("Registered Successfully");
	});

    it('should login', async function() {
        const res = await request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({ email: randomEmail + '@gmail.com', password: '12345' })
    		
        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toBeDefined()
        
        token = res.body.data
	});

    it('should add profile', async function() {
        const res = await request(app)
            .post('/profile')
            .set('Content-Type', 'application/json')
            .set('x-token', token)
            .send({
                fullName: "Abhi sneha",
                address1: "2 - 243 Houston, Canada",
                address2: "5 - 263 Mogolia, America",
                city: "Houston",
                state: "Newyork",
                zipcode: "34534"
            })
    		
        data = res.body.data;

        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toBeDefined()
        expect(data.fullName).toEqual("Abhi sneha")
        expect(data.address1).toEqual("2 - 243 Houston, Canada")
        expect(data.address2).toEqual("5 - 263 Mogolia, America")
        expect(data.city).toEqual("Houston")
        expect(data.state).toEqual("Newyork")
        expect(data.zipcode).toEqual("34534")
	});

    it('should edit profile', async function() {
        const res = await request(app)
            .patch('/profile')
            .set('Content-Type', 'application/json')
            .set('x-token', token)
            .send({
                fullName: "Joe kater",
                zipcode: "59998"
            })
    	
        data = res.body.data;
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toBeDefined()
        expect(data.fullName).toEqual("Joe kater")
        expect(data.address1).toEqual("2 - 243 Houston, Canada")
        expect(data.address2).toEqual("5 - 263 Mogolia, America")
        expect(data.city).toEqual("Houston")
        expect(data.state).toEqual("Newyork")
        expect(data.zipcode).toEqual("59998")
        
	});

    it('gets profile', async function() {
        const res = await request(app)
            .get('/profile')
            .set('x-token', token)
    	
        data = res.body.data;

        expect(res.statusCode).toEqual(200)
        expect(data.fullName).toEqual("Joe kater")
        expect(data.address1).toEqual("2 - 243 Houston, Canada")
        expect(data.address2).toEqual("5 - 263 Mogolia, America")
        expect(data.city).toEqual("Houston")
        expect(data.state).toEqual("Newyork")
        expect(data.zipcode).toEqual("59998")
	});

    it('adds quote', async function() {
        const res = await request(app)
            .post('/quote')
            .set('Content-Type', 'application/json')
            .set('x-token', token)
            .send({
                requestedGallons: 5,
                deliveryDate: "2022/06/22",
            })
    		
        data = res.body.data;

        expect(res.statusCode).toEqual(200)
        expect(data.totalDue).toEqual(8.774999999999999)
        expect(data.requestedGallons).toEqual(5)
        expect(data.deliveryDate).toEqual("2022-06-21T18:30:00.000Z")

        id = res.body.data._id;
        
	});

    it('gets quote with id', async function() {
        const res = await request(app)
            .get('/quote')
            .query({id})
            .set('Content-Type', 'application/json')
            .set('x-token', token)

        quote = res.body.data;
        expect(res.statusCode).toEqual(200);
        expect(quote._id).toEqual(id);
        expect(quote.requestedGallons).toEqual(5);
        expect(quote.totalDue).toEqual(8.774999999999999);
        expect(data.deliveryDate).toEqual("2022-06-21T18:30:00.000Z")

	});

    it('get quote price', async function() {
        const res = await request(app)
            .post('/quote/get-quote')
            .set('Content-Type', 'application/json')
            .set('x-token', token)
            .send({
                requestedGallons: 5,
            })
    		
        data = res.body.data;
        expect(res.statusCode).toEqual(200)
        expect(data.totalDue).toEqual(8.7)
        expect(data.suggestedPrice).toEqual(1.74)        
	});



    it('gets quote history', async function() {
        const res = await request(app)
            .get('/quote/history')
            .set('Content-Type', 'application/json')
            .set('x-token', token)
    		
        expect(res.statusCode).toEqual(200);
	});


  
  });
