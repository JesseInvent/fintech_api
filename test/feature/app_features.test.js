import request from 'supertest'
import { assert } from 'chai'
import app from '../../src/app.js'
import { User } from '../helpers/userData.js'
import UserModel from '../../src/models/User.js'

describe('Application main feauture tests', () => {

    beforeEach( async () => {
        await UserModel.destroy({
            truncate: true
        })
    })

    it('Tests a user must provide auth token to add bank account details', async () => {

       await User.signUp()
       const loginResponse = await User.login()

       const { auth_token } = loginResponse.body

       const response = await request(app)
                    .post('/api/v1/wallet/add_beneficiary').send(User.getUserBankDetails())

       assert.equal(401, response.statusCode)

    })

    it('Tests a user can add bank account details with a valid token', async () => {

        await User.signUp()
        const loginResponse = await User.login()
 
        const { auth_token } = loginResponse.body
 
        const response = await request(app)
                     .post('/api/v1/wallet/add_beneficiary').send(User.getUserBankDetails())
                     .set('Authorization', `Bearer ${auth_token}`)
 
      //   console.log(response.body);
 
        assert.equal(202, response.statusCode)
 
     })

    
    it('Tests a user cannot request for payment url without auth token', async () => {

        const response = await request(app).get('/api/v1/payment/initialize')

    //  console.log(response);

        assert.equal(401, response.status)

    })

    it('Tests a user can request for payment url', async () => {

    await User.signUp()
    const loginResponse = await User.login()

    const { auth_token } = loginResponse.body
        const response = await request(app).get('/api/v1/payment/initialize')
        .set('Authorization', `Bearer ${auth_token}`)

        //  console.log(response);

        assert.equal(202, response.status)
        assert.exists(response.body.payment_url)

    })


})