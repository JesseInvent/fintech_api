import jwt from "jsonwebtoken"

export const createAuthToken = (user) => {

    try {
        const token = jwt.sign({ id: user.id, email: user.email }, 
                    process. env.JWT_SECRET, {
            })

        return token

    } catch (error) {
        console.error(error);
    }

}

export const verifyAndDecodeAuthToken = (token) => {

  try {

    return jwt.verify(token, process.env.JWT_SECRET)

  } catch (error) {
       
    console.error(error);

  }

}