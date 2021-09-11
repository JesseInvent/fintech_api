
class User {

    static full_name = 'John Doe'
    static email = 'johndoe@gmail.com'
    static password = '12345678'
    static confirm_password = '12345678'
    static short_password = '123456'

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

}

export { User }