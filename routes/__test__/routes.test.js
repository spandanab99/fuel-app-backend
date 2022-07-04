const { app, server } = require('../../index');
const request = require('supertest');
const PORT = 8000;

let token = ""
let id = ""

describe('Fuel API', function() {

    afterAll(done => {
        server.close();
        done();
    });
	  
	it('should register', async function() {
        const res = await request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({ email: 'joe@gmail.com', password: '12345' })
    		
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toEqual("Registered Successfully");
	});

    it('should login', async function() {
        const res = await request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({ email: 'joe@gmail.com', password: '12345' })
    		
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
        expect(res.body.data.email).toEqual('joe@gmail.com')
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
                deliveryDate: "22/06/2022",
            })
    		
        data = res.body.data;

        expect(res.statusCode).toEqual(200)
        expect(data.totalDue).toEqual(50)
        expect(data.requestedGallons).toEqual(5)
        expect(data.deliveryDate).toEqual("22/06/2022")

        id = res.body.data.id;
        
	});

    it('gets quote with id', async function() {
        const res = await request(app)
            .get('/quote')
            .query({id})
            .set('Content-Type', 'application/json')
            .set('x-token', token)

        quote = res.body.data;
        expect(res.statusCode).toEqual(200);
        expect(quote.id).toEqual(id);
        expect(quote.requestedGallons).toEqual(5);
        expect(quote.totalDue).toEqual(50);
        expect(data.deliveryDate).toEqual("22/06/2022")

	});

    it('gets quote history', async function() {
        const res = await request(app)
            .get('/quote/history')
            .set('Content-Type', 'application/json')
            .set('x-token', token)
    		
        expect(res.statusCode).toEqual(200);
	});


  
  });
