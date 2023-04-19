const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const Basket = sequelize.define('basket', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
});

const BasketProduct = sequelize.define('basketProduct', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
});

const Product = sequelize.define('product', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	img: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	rating: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
});

const Categories = sequelize.define('categories', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
});

const CategoriesGroup = sequelize.define('categoriesGroup', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
});

const SubCategories = sequelize.define('subCategories', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
});

const Models = sequelize.define('models', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	img: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const Rating = sequelize.define('rating', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	rate: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

const ProductInfo = sequelize.define('productInfo', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

User.hasOne(Basket);
Basket.belongsTo(User);
User.hasMany(Rating);
Rating.belongsTo(User);
Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);
Categories.hasMany(CategoriesGroup);
CategoriesGroup.belongsTo(Categories);
CategoriesGroup.hasMany(SubCategories);
SubCategories.belongsTo(CategoriesGroup);
SubCategories.hasMany(Models);
Models.belongsTo(SubCategories);
Product.hasMany(Rating);
Rating.belongsTo(Product);
Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);
Product.hasMany(ProductInfo);
ProductInfo.belongsTo(Product);

module.exports = {
	User,
	Basket,
	BasketProduct,
	Product,
	Categories,
	CategoriesGroup,
	SubCategories,
	Models,
	Rating,
	ProductInfo,
};
