import { assert } from "chai"
import { User } from '../helpers/userData.js'
import { User2 } from '../helpers/user2Data.js'
import { creditUserWallet, debitUserWallet, fundUserWallet, transferFundsToAnotherUser } from "../../src/utils/wallet/userWalletFunctions.js"
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

    it('Tests the credit user wallet module increments the amount on wallet table', async () => {

        await User.signUp()
        const loginResponse = await User.login()

        const { user } = loginResponse.body;
        const creditAmount =  5000;

        const userWallet = await Wallet.findOne({ where: { email: user.email } })

        await creditUserWallet({ email: user.email, amount: creditAmount })

        const userUpdatedWallet = await Wallet.findOne({ where: { email: user.email } })

        assert.equal(userUpdatedWallet.amount, userWallet.amount + creditAmount)
    })

    it('Tests the debit user wallet module decrements the amount on wallet table', async () => {

        await User.signUp()
        const loginResponse = await User.login()

        const { user } = loginResponse.body

        const creditAmount = 10000
        const debitAmount =  5000

        await creditUserWallet({ email: user.email, amount: creditAmount })

        const userWallet = await Wallet.findOne({ where: { email: user.email } })

        await debitUserWallet({ email: user.email, amount: debitAmount })

        const userUpdatedWallet = await Wallet.findOne({ where: { email: user.email } })

        assert.equal(userUpdatedWallet.amount, userWallet.amount - debitAmount)
    })

    it('Tests the fund wallet module increments the amount on wallet table', async () => {

        await User.signUp()
        const loginResponse = await User.login()

        const { user } = loginResponse.body;
        const fundAmount =  5000;

        const userWallet = await Wallet.findOne({ where: { email: user.email } })

        await fundUserWallet({ email: user.email, amount: fundAmount })

        const userUpdatedWallet = await Wallet.findOne({ where: { email: user.email } })

        assert.equal(userUpdatedWallet.amount, userWallet.amount + fundAmount)
    })

    it('Tests the transfer funds to another user wallet module increments the amount on wallet table', async () => {

        // User 1 signup and login
        await User.signUp()
        const login1Response = await User.login()

        // User 2 signup and login
        await User2.signUp()
        const login2Response = await User2.login()

        const { user: user1 } = login1Response.body;
        const transferAmount =  2000;

        const { user: user2 } = login2Response.body;

        // Fund User 1 wallet
        await fundUserWallet({amount: 10000, email: user1.email})

        // Get both users wallet
        const user1Wallet = await Wallet.findOne({ 
                where: { email: user1.email } 
        })

        const user2Wallet = await Wallet.findOne({ 
            where: { email: user2.email } 
        })

        // Transfer funds from user 1 to user 2 wallet 
        await transferFundsToAnotherUser({
                senderEmail: user1.email,
                destination_email: user2.email,
                amount: transferAmount
            })

        // Get wallets after transfer
        const user1UpdatedWallet = await Wallet.findOne({ where: { email: user1.email } })
        const user2UpdatedWallet = await Wallet.findOne({ where: { email: user2.email } })

        // Assert User 1 wallet was debited of transferAmount
        assert.equal(user1UpdatedWallet.amount, user1Wallet.amount - transferAmount)

        // Assert User 2 wallet was credited with transferAmount
        assert.equal(user2UpdatedWallet.amount, user2Wallet.amount + transferAmount)
    })


    
})