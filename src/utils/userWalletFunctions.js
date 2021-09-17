import Wallet from "../models/Wallet.js"

export const createUserWallet = async (email) => {

    const wallet = await Wallet.create({ email })
    return wallet
}

export const fundUserWallet = async (walletId) =>  {

}

export const transferFundsToAnotherUser = async (email) => {

}