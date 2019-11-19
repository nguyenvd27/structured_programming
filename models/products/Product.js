const Sequelize = require('sequelize');
const sequelize = require('../../databases/database').sequelize;
const Op = require('../../databases/database').Op;

// const Category = require('./Category');

const Product = sequelize.define('product', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING
	},
	price: {
		type: Sequelize.INTEGER
	},
	description: {
		type: Sequelize.TEXT
	},
	image: {
		type: Sequelize.STRING
	},
	category: {
		type: Sequelize.INTEGER
	},
	brand: {
		type: Sequelize.STRING
	},
	sold_out: {
		type: Sequelize.BOOLEAN
	},
	created_at: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW
	},
	updated_at: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW
	}
},
{
	timestamps: false,
});

// Category.hasMany(Product, { foreignKey: 'productid', sourceKey: 'id'});
// Product.belongsTo(Category, { foreignKey: 'productid', targetKey: 'id'});

module.exports = Product;