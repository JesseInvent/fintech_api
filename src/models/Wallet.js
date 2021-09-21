import sequelize from 'sequelize'
import connectDB from '../DB/connect.js'
import { v4 as uuidv4 } from 'uuid'

const { DataTypes, Model } = sequelize

const db_connection = await connectDB();

class Wallet extends Model {}

Wallet.init(
    {
        wallet_id: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        last_transaction_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },
    {
        sequelize: db_connection,
        timestamps: true,
        modelName: 'Wallet'
    }
)

// Hooks
Wallet.beforeCreate((wallet, options) => {
    wallet.wallet_id =  uuidv4()
})

await Wallet.sync()

export default Wallet