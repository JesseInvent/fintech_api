import request from 'supertest'
import { assert } from 'chai'
import app from '../../src/app.js'
import { User } from '../helpers/userData.js'
import UserModel from '../../src/models/User.js'

describe('Application main feauture tests', () => {

    it('Tests a user must provide auth token to add bank account details', async () => {

       await User.signUp()
       const loginResponse = await User.login()

       const { auth_token } = loginResponse.body

       const response = await request(app)
                    .post('/api/v1/wallet/add_beneficiary').send(User.getUserBankDetails())

       assert.equal(403, response.statusCode)

    })

    it('Tests a user can add bank account details with a valid token', async () => {

        await User.signUp()
        const loginResponse = await User.login()
 
        const { auth_token } = loginResponse.body
 
        const response = await request(app)
                     .post('/api/v1/wallet/add_beneficiary').send(User.getUserBankDetails())
                     .set('Authorization', `Bearer ${auth_token}`)
 
        console.log(response.body);
 
        assert.equal(202, response.statusCode)
 
     })
 

})