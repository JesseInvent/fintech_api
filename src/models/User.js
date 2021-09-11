import { hash } from '../utils/bcryptFunction.js';
import sequelize from 'sequelize'
import connectDB from '../DB/connect.js'

const { DataTypes, Model } = sequelize

const db_connection = await connectDB();

class User extends Model {}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },  
        password: {
            type: DataTypes.STRING,
            allowNull: false,
           set(value) {
                const hashed = hash(value)
                this.setDataValue('password', hashed)
            }
        },
        bank_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        account_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sort_code: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize: db_connection,
        timestamps: true,
        modelName: 'User'
    }
)

await User.sync()

export default User