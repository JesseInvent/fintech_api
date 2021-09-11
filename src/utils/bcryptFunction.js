import bcrypt from "bcryptjs"

export const hash = (string) => {

    const salt =  bcrypt.genSaltSync()
    const hashed = bcrypt.hashSync(string, salt)

    return hashed
}

export const compareHash = async ({ hashed, string }) => {

    return await bcrypt.compare(string, hashed)
}