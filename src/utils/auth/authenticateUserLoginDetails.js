import User from "../../models/User.js"
import { compareHash } from "../bcryptFunction.js"

export default async ({ email, password }) => {

    let user = await User.findOne({ 
        where: { email } 
    })

    if(!user) {
        return false
    }

    const comparePassword = await compareHash({ hashed: user.password, string: password })

    if(comparePassword === false) {
       return false
    }

    return user.toJSON()
      
}