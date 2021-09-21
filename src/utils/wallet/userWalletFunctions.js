import Wallet from "../../models/Wallet.js"

export const createUserWallet = async (email) => {

    const wallet = await Wallet.create({ email })
    return wallet
}

export const creditUserWallet = async ({email, amount}) => {

    const userWallet = await Wallet.findOne({ 
        where: { email }
    })

    await userWallet.increment({ amount })

    return true
}

export const debitUserWallet = async ({email, amount}) => {
    
    const userWallet = await Wallet.findOne({ 
        where: { email }
    })

    await userWallet.decrement({ amount })

    return true
}

export const fundUserWallet = async ({ amount, email }) =>  {

    await creditUserWallet({email, amount})

    return true
}

export const transferFundsToAnotherUser = async ({ amount, senderEmail, destination_email }) => {

    await debitUserWallet({email: senderEmail, amount})
    
    await creditUserWallet({email: destination_email, amount}) 

    return true

}