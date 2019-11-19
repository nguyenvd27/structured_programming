// Models
const Product = require('../../../models/products/Product');
const Brand = require('../../../models/products/Brand');
const Category = require('../../../models/products/Category');
const sequelize = require('../../../databases/database').sequelize;

// Query datas from DB
module.exports.index = async (req, res ) => {
    try{
        const brands = await Brand.findAll({
            order: [
            ['created_at', 'DESC']
        ]
        });
        
        res.json({
            result: 'ok',
            data: brands,
            message: "Query list of brands successfully"
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `Query list of brands failed. Error: ${error}`
        });
    }
}

// Query 1 data from DB
module.exports.show = async (req, res) => {
	let id = req.params.id;

	try{
        const brands = await Brand.findAll({
            order: [
            ['created_at', 'DESC']
            ],
            where: {
                id
            }
        });

        const products = await Product.findAll({
            where: {
            	brand: id 
            }
        });

        if(brands.length > 0){
        	res.json({
        		result: 'ok',
	            data: brands,
                productsOfBrand: products,
	            message: `query Brand by id successfully`
        	});
        }else{
        	res.json({
        		result: 'failed',
	            data: {},
	            message: `Cannot find Brand to update`
        	});
        }
        
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query Brand by id failed. Error: ${error}`
        });
    }
}

// Create new data in DB
module.exports.create = async (req, res ) => {
    let { name, description} = req.body;
    try{
        let newBrand = await Brand.create({
            name,
            description,
        }, {
            fields: ["name", "description", "updated_at", "created_at"]
        });

        if(newBrand){
            res.json({
                result: 'ok',
                data: newBrand,
                message: `Create new Brand successfully`
            });
        }else {
            res.json({
                result: 'failed',
                data: {},
                message: `Insert a new Brand failed`
            });
        }
    }catch(error){
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new Brand failed. Error: ${error}`
        });
    }
}

// update date in DB
module.exports.update = async (req, res ) => {
    let { name, description} = req.body;
    let id = req.params.id;
    try{
        let brands = await Brand.findAll({
            where: {
            	id
            }
        });

        if(brands.length > 0){
        	const updateBrand = await Brand.update({
	            name: name ? name : brands.name,
	            description: description ? description : brands.description,
                updated_at: sequelize.fn('NOW')
	        }, {
	            where: {
	                id
	            }
	        });

        	brands = await Brand.findAll({
	            where: {
	            	id
	            }
	        });

        	res.json({
                result: 'ok',
                data: brands,
                message: `update a brand successfully`
            });
        }else {
        	res.json({
                result: 'failed',
                data: {},
                message: `Cannot find brand to update`
            });
        }
    }catch(error){
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update a brand. Error: ${error}`
        });
    }
}

// Delete data in DB
module.exports.delete = async (req, res) => {
	let id = req.params.id;
	try{
		let numberOfBrand = await Brand.destroy({
            where: {
                id
            }
        });

        if(numberOfBrand > 0){
        	res.json({
                result: 'ok',
                message: `Delete a brand successfully`,
                count: numberOfBrand
            });
        }else{
        	res.json({
                result: 'failed',
                data: {},
                message: `Cannot find brand to delete`
            });
        }
	}catch(error){
		res.json({
            result: 'failed',
            data: {},
            message: `Cannot delete a brand. Error: ${error}`
        });
	}
}