import request from 'supertest'
import app from '../../src/app.js'

class User {

    static full_name = 'John Doe'
    static email = 'johndoe@gmail.com'
    static password = '12345678'
    static confirm_password = '12345678'
    static short_password = '123456'
    static bank_name = 'first bank'
    static account_number = '03847693845'
    static sort_code = '212'

    static getUserWithValidDetails () {

        return {
            name: this.full_name,
            email: this.email,
            password: this.password,
            confirm_password: this.confirm_password
        }
    }

   static getUserWithoutEmail () {
        return {
            name: this.full_name,
            password: this.password,
            confirm_password: this.confirm_password 
        }
    }

    static getUserWithUnMatchedPasswords () {
        return {
            name: this.full_name,
            password: this.password,
            confirm_password: '123821' 
        }
    }

    static getUserWithShortPassword () {
        return {
            name: this.full_name,
            password: this.short_password,
            confirm_password: this.short_password 
        }
    }

    static getUserInvalidLoginDetails() {
        return {
            email: this.email,
            password: '1232123'
        }
    }

    static getUserValidLoginDetails() {
        return {
            email: this.email,
            password: this.password
        }
    }

    static getUserBankDetails() {
        return {
           bank_name: this.bank_name,
           account_number: this.account_number,
           sort_code: this.sort_code
        }
    }

    // User actions
    static async signUp() {
        return await request(app).post('/api/v1/auth/signup').send(User.getUserWithValidDetails())
    }

    static async login() {
        return await request(app).post('/api/v1/auth/login').send(User.getUserValidLoginDetails())
    }

    static async addBeneficiary(authToken) {
     return   await request(app)
                        .post('/api/v1/wallet/add_beneficiary').send(User.getUserBankDetails())
                        .set('Authorization', `Bearer ${authToken}`)
    }
}

export { User }