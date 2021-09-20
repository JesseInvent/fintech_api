import Wallet from "../models/Wallet.js"

export const createUserWallet = async (email) => {

    const wallet = await Wallet.create({ email })
    return wallet
}

export const fundUserWallet = async ({ amount, email }) =>  {

    await Wallet.update({ amount: +amount }, {
        where: {
            email: email
        }
    })

    return true
}

export const transferFundsToAnotherUser = async ({ amount, senderEmail, destinationEmail }) => {

    // Debit sender wallet
    const senderWallet = await Wallet.findOne({ 
        where: { email: senderEmail }
    })

    await senderWallet.decrement({ amount})

    // Credit reciepient wallet
    const reciepientWallet = await Wallet.findOne({ 
        where: { email: destinationEmail }
    })

    await reciepientWallet.increment({ amount })

    return true

}