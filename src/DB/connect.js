import { Sequelize } from "sequelize"
import path from "path"

export default async () => {

    let sequelize
    const env = process.env.NODE_ENV

    try {

        if (env === 'development' || env === 'production') {

            sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
                host: process.env.MYSQL_HOST,
                port: process.env.MYSQL_PORT,
                dialect: 'mysql'
            })
        }

        else {

            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: path.resolve('DB/database.sqlite')
            })
        }

        await sequelize.authenticate()
        console.log(`Database ${env} connection established 🙂`)
        return sequelize

    } catch (error) {

        console.error(error)
        
    }
  
}