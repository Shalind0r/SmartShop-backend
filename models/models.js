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
	availability: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	art: {
		type: DataTypes.STRING,
	},
	new_label: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
	},
	popular_label: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
	},
	discount_label: {
		type: DataTypes.INTEGER,
		allowNull: true,
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

const Specification = sequelize.define('specification', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	specification: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	value: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const SpecificationGroup = sequelize.define('specification_group', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const ProductImages = sequelize.define('product_images ', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	path: {
		type: DataTypes.STRING,
		allowNull: false,
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
// Todo сделать нормальную модель коментариев
const Comments = sequelize.define('comments', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
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
	model: {
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
SubCategories.hasMany(SpecificationGroup);
SpecificationGroup.belongsTo(SubCategories);
Models.belongsTo(SubCategories);
Models.hasMany(Product);
Product.belongsTo(Models);
Product.hasMany(Comments);
Comments.belongsTo(Product);
Product.hasMany(Specification);
Specification.belongsTo(Product);
Specification.belongsTo(SpecificationGroup);
SpecificationGroup.hasMany(Specification);
Product.hasMany(Rating);
Rating.belongsTo(Product);
Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);
Product.hasMany(ProductInfo);
ProductInfo.belongsTo(Product);
ProductImages.belongsTo(ProductInfo);
ProductInfo.hasMany(ProductImages);

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
	Specification,
	SpecificationGroup,
	ProductImages,
	Comments,
};
