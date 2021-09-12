import Wallet from "../models/Wallet.js"

export const createUserWallet = async (email) => {

    const wallet = await Wallet.create({ email })
    return wallet
}