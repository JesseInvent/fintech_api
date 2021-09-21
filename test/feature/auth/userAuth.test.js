import request from 'supertest'
import { assert } from 'chai'
import app from '../../../src/app.js'
import { User } from '../../helpers/userData.js'
import UserModel from '../../../src/models/User.js'
import Wallet from '../../../src/models/Wallet.js'

describe("Users Signup and Authentication tests", async () => {

    // beforeEach(async () => {
    //     await UserModel.sync()
    // })

   beforeEach( async () => {
        await UserModel.destroy({
            truncate: true
        })

        Wallet.destroy({
            truncate: true
        })
    })
  

    it("Tests a user must provide name, email and password when signing up", async () => {

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

        const response = await User.signUp()

        // console.log(response);

        assert.equal(response.statusCode, 201)
        assert.exists(response.body.message)
        assert.exists(response.body.user)
        assert.exists(response.body.auth_token)
    })

    it("Tests a user cannot login without providing details", async () => {

        const response = await request(app).post('/api/v1/auth/login').send({})

        // console.log(response);

        assert.equal(response.statusCode, 400)
        assert.exists(response.body.message)
    })


    it("Tests a user cannot login with invalid details", async () => {

        await User.signUp()
        const response = await request(app).post('/api/v1/auth/login').send(User.getUserInvalidLoginDetails())

        // console.log(response.body);

        assert.equal(response.statusCode, 400)
        assert.exists(response.body.message)
    })


    it("Tests a user can login with valid details", async () => {

        await User.signUp()
        const response = await User.login()

        // console.log(response.body);

        assert.equal(response.statusCode, 200)
        assert.exists(response.body.message)
        assert.exists(response.body.user)
        assert.exists(response.body.auth_token)

    })


})