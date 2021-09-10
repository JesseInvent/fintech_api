import sequelize from 'sequelize'
import connectDB from '../DB/connect.js'

const { DataTypes, Model } = sequelize

const db_connection = await connectDB();

class User extends Model {}

User.init(
    {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
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