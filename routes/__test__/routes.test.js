const { app, server } = require('../../index');
const request = require('supertest');
const PORT = 8000;

let token = ""

describe('Fuel API', function() {

    afterAll(done => {
        server.close();
        done();
    });
	  
	it('should register', async function() {
        const res = await request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({ email: 'vijay@gmail.com', password: '12345' })
    		
        expect(res.statusCode).toEqual(200);
	});

    it('should login', async function() {
        const res = await request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({ email: 'vijay@gmail.com', password: '12345' })
    		
        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toBeDefined()
        
        token = res.body.data
	});

    it('gets profile', async function() {
        const res = await request(app)
            .get('/profile')
            .set('x-token', token)
            .send({ email: 'vijay@gmail.com', password: '12345' })
    		
        expect(res.statusCode).toEqual(200)
        expect(res.body.data.email).toEqual('vijay@gmail.com')
	});
  
  });
