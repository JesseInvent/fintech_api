import request from 'supertest'
import { assert } from 'chai'
import app from '../../src/app.js'
import { User } from '../helpers/userData.js'
import { User2 } from '../helpers/user2Data.js'
import UserModel from '../../src/models/User.js'
import Wallet from '../../src/models/Wallet.js'
import { fundUserWallet } from "../../src/utils/wallet/userWalletFunctions.js"

describe('Application main feauture tests', () => {

    beforeEach( async () => {
        await UserModel.destroy({
            truncate: true
        })

        await Wallet.destroy({
            truncate: true
        })
    })

    it('Tests a user cannot get wallet without auth token', async () => {

        await User.signUp()

        const response = await request(app).get('/api/v1/wallet/get')

        assert.equal(401, response.status)

    }) 

    it('Tests a user can get wallet with valid auth token', async () => {

        await User.signUp()
        const loginResponse = await User.login()
 
        const { auth_token } = loginResponse.body

        const response = await request(app).get('/api/v1/wallet/get')   
                                        .set('Authorization', `Bearer ${auth_token}`)

        // console.log(response.body);

        assert.equal(200, response.status)
        assert.exists(response.body.user_wallet)

    }) 

    it('Tests a user must provide auth token to add bank account details', async () => {

       await User.signUp()

       const response = await request(app).post('/api/v1/wallet/add_beneficiary')
                                    .send(User.getUserBankDetails())

       assert.equal(401, response.statusCode)

    })

    it('Tests a user can add bank account details with a valid token', async () => {

        await User.signUp()
        const loginResponse = await User.login()
 
        const { auth_token } = loginResponse.body
 
        const response = await User.addBeneficiary(auth_token)
 
        // console.log(response.body);
 
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

    /**
     * This test suite is for temporary functionality
    */

    it('Tests a user can fund wallet', async () => {
       
        const signupResponse = await User.signUp()

        const { user } = signupResponse.body

        const response = await request(app).post('/api/v1/wallet/fund')
        .send({amount: 5000, email: user.email})

        // console.log(response);

        assert.equal(200, response.status)
    })

    it('Tests a user can must enough funds to trasnfer', async () => {
      
        // User 1 signup and login
        await User.signUp()
        const login1response = await User.login()
        const { auth_token: user1_auth_token } = login1response.body

        // User 2 signup
        const user2signupResponse = await User2.signUp()

        const { user: user2 } = user2signupResponse.body

        const response = await request(app).post('/api/v1/wallet/transfer')
        .set('Authorization', `Bearer ${user1_auth_token}`)
        .send({ destination_email: user2.email, amount: 5000 })

        // console.log(response.body);

        assert.equal(422, response.status)
    })

    it('Tests a user can transfer fund to another user', async () => {
       
        // User 1 signup and login
        await User.signUp()
        const login1response = await User.login()
        const { auth_token: user1_auth_token } = login1response.body

        // User 2 signup
        const user2signupResponse = await User2.signUp()

        const { user: user1 } = login1response.body
        const { user: user2 } = user2signupResponse.body

        // Fund User 1 wallet mock request
        await fundUserWallet({ email: user1.email, amount: 10000 })

        const response = await request(app).post('/api/v1/wallet/transfer')
        .set('Authorization', `Bearer ${user1_auth_token}`)
        .send({ destination_email: user2.email, amount: 5000 })

        // console.log(response);

        assert.equal(200, response.status)
    })

    it('Tests that an unauthenticated user cannot request from withdrawal', async () => {

        await User.signUp()

        const response = await request(app).post('/api/v1/wallet/withdraw')
        
        assert.equal(401, response.status)

    })

    it('Tests that a user must add beneficiary before withdrawal', async () => {

        await User.signUp()
        const loginResponse = await User.login()
        const { auth_token } = loginResponse.body

        const response = await request(app).post('/api/v1/wallet/withdraw')
                        .set('Authorization', `Bearer ${auth_token}`)
                        .send({ amount: 5000, account_password: User.password })

        // console.log(response.body);
        
        assert.equal(422, response.status)

    })

    it('Tests that an authenticated user can request for withdrawal with invalid account password', async () => {

        await User.signUp()
        const loginResponse = await User.login()

        const { auth_token } = loginResponse.body

        // abstract
        await User.addBeneficiary(auth_token)

        const response = await request(app).post('/api/v1/wallet/withdraw')
                        .set('Authorization', `Bearer ${auth_token}`)
                        .send({ amount: 5000, account_password: 'wrongPaaword' })

        // console.log(response.body);
        
        assert.equal(401, response.status)

    })


    it('Tests that an authenticated user can request for withdrawal', async () => {

        await User.signUp()
        const loginResponse = await User.login()

        const { auth_token } = loginResponse.body

        await User.addBeneficiary(auth_token)

        const response = await request(app).post('/api/v1/wallet/withdraw')
                        .set('Authorization', `Bearer ${auth_token}`)
                        .send({ amount: 5000, account_password: User.password })

        // console.log(response.body);
        
        assert.equal(200, response.status)

    })

})