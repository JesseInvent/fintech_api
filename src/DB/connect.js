import { Sequelize } from "sequelize"
import path from "path"
import dotenv from "dotenv"

dotenv.config()

export default async () => {

    let sequelize
    const env = process.env.NODE_ENV

    try {

        if (env === 'development' || env === 'production') {

            sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
                host: process.env.MYSQL_HOST,
                port: process.env.MYSQL_PORT,
                dialect: 'mysql',
                logging: false
            })
        }

        else {

            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: path.resolve('test/DB/database.sqlite'),
                logging: false
            })
        }

        await sequelize.authenticate()
        console.log(`Database ${env} connection established 🙂`)
        return sequelize

    } catch (error) {

        console.error(error)
        
    }
  
}