import { assert } from "chai"
import { User } from '../helpers/userData.js'
import { User2 } from '../helpers/user2Data.js'
import { fundUserWallet, transferFundsToAnotherUser } from "../../src/utils/userWalletFunctions.js"
import UserModel from '../../src/models/User.js'
import Wallet from "../../src/models/Wallet.js"

describe('Wallet functions unit tests', () => {

    beforeEach( async () => {
        await UserModel.destroy({
            truncate: true
        })

        await Wallet.destroy({
            truncate: true
        })
    })

    it('Tests the fund wallet module increments the amount on wallet table', async () => {

        await User.signUp()
        const loginResponse = await User.login()

        const { user } = loginResponse.body;
        const amount =  5000;

        const userWallet = await Wallet.findOne({ where: { email: user.email } })

        await fundUserWallet({ email: user.email, amount: amount })

        const userUpdatedWallet = await Wallet.findOne({ where: { email: user.email } })

        assert.equal(userUpdatedWallet.amount, userWallet.amount + amount)
    })

    it('Tests the transfer funds to another user wallet module increments the amount on wallet table', async () => {

        await User.signUp()
        const login1Response = await User.login()

        await User2.signUp()
        const login2Response = await User2.login()

        const { user: user1 } = login1Response.body;
        const transferAmount =  2000;

        const { user: user2 } = login2Response.body;

        // Fund user 1 wallet
        fundUserWallet({amount: 10000, email: user1.email})

        const user1Wallet = await Wallet.findOne({ 
                where: { email: user1.email } 
            })

        const user2Wallet = await Wallet.findOne({ 
            where: { email: user2.email } 
        })

        await transferFundsToAnotherUser({
                senderEmail: user1.email,
                destinationEmail: user2.email,
                amount: transferAmount
            })

        const user1UpdatedWallet = await Wallet.findOne({ where: { email: user1.email } })

        const user2UpdatedWallet = await Wallet.findOne({ where: { email: user2.email } })

        // Sender's wallet was debited of transferAmount
        assert.equal(user1UpdatedWallet.amount, user1Wallet.amount - transferAmount)

        // Reciepient's wallet was credited with transferAmount
        assert.equal(user2UpdatedWallet.amount, user2Wallet.amount + transferAmount)
    })
    
})