const sequelize = require('../db_connect')
const {DataType, DataTypes} = require('sequelize')

const user = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const basketDevise = sequelize.define('basketDevise', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const devise = sequelize.define('devise', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: "0"},
    img: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
});

const deviseInfo = sequelize.define('deviseInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
});

const typeBrand = sequelize.define('typeBrand' , {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


user.hasOne(basket)
basket.belongsTo(user)

user.hasMany(rating)
rating.belongsTo(user)

basket.hasMany(basketDevise)
basketDevise.belongsTo(basket)

type.hasMany(devise)
devise.belongsTo(type)

brand.hasMany(devise)
devise.belongsTo(brand)

devise.hasMany(rating)
rating.belongsTo(devise)

devise.hasMany(deviseInfo)
deviseInfo.belongsTo(devise)

type.belongsToMany(brand, {through: typeBrand })
brand.belongsToMany(type, {through: typeBrand })

module.exports = {
    user,
    basket,
    basketDevise,
    devise,
    type,
    brand,
    rating,
    deviseInfo,
    typeBrand
}
