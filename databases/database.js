const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
// 	process.env.DATABASE_URL
// );

const sequelize = new Sequelize(
	'postgres', // db name
	'postgres', // username
	'123456',
	{
		dialect: 'postgres',
		host: 'localhost',
		// operatorsAliases: false,
		pool: {
			max: 5,
			min: 0,
			require: 30000,
			idle: 10000
		}
	}
);

const Op = Sequelize.Op;

module.exports = {
	sequelize,
	Op
}
//DATABASE_URL