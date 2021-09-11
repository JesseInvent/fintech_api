import request from 'supertest'
import { assert } from 'chai'
import app from '../../src/app.js'

describe('api response test', () => {
    
    it("Tests the base url of the api is returing a 200 response", async () => {

        const response = await request(app).get('/api/v1')
        assert.equal(response.statusCode, 200)
        
    })
})