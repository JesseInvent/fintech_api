import request from 'supertest'
import { assert } from 'chai'
import app from '../../../src/app.js'
import { User } from '../../helpers/userData.js'

describe("Users Signup and Authentication tests", () => {

    it("Tests a user must provide name, email and password when signing up", async () => {

        // const user = new User

        const response = await request(app).post('/api/v1/auth/signup').send(User.getUserWithoutEmail())

        // console.log(response.body);

        assert.equal(response.statusCode, 400)
        assert.exists(response.body.message)
    })   
        
    it("Tests a user password and confirm password must match when signing up", async () => {

        const response = await request(app).post('/api/v1/auth/signup').send(User.getUserWithUnMatchedPasswords())

        // console.log(response.body);

        assert.equal(response.statusCode, 400)
        assert.exists(response.body.message)
    })  

    it("Tests a user password be creater than 6 digits", async () => {

        const response = await request(app).post('/api/v1/auth/signup').send(User.getUserWithShortPassword())

        // console.log(response.body);

        assert.equal(response.statusCode, 400)
        assert.exists(response.body.message)
    })  

    it("Tests a user can signup with valid details", async () => {

        const response = await request(app).post('/api/v1/auth/signup').send(User.getUserWithValidDetails())

        console.log(response.body);

        assert.equal(response.statusCode, 201)
        assert.exists(response.body.message)
    })

})