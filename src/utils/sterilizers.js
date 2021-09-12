

export const sterilizeUserModel = (user) => {
    delete user.id
    delete user.password
    delete user.updatedAt
    
    return user
}

export const sterilizeWalletModel = (wallet) => {
    delete wallet.id
    delete wallet.updatedAt
    delete wallet.email

    return wallet
}