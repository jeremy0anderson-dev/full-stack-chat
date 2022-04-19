const sequelize = require('../config/connect'),
    {Model, DataTypes} = require('sequelize');
    bcrypt = require('bcrypt');

class Users extends Model {
    // hash the password the user entered and compare to the hash made before user was added to the database.
    verifyPassword(loginPassword){
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

Users.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        hooks:{
            //hash password before storing it in the db
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hashSync(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData){
                updatedUserData.password = await bcrypt.hashSync(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'users'
    });
module.exports = Users;