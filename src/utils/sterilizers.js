

export const sterilizeUserModel = (user) => {
    delete user.id
    delete user.password
    delete user.updatedAt
    return user
}