const Sequelize = require('sequelize');
const sequelize = require('../../databases/database').sequelize;
const Op = require('../../databases/database').Op;

const Category = sequelize.define('category', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.TEXT
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

module.exports = Category;