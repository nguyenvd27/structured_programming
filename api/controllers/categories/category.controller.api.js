// Models
const Product = require('../../../models/products/Product');
const Category = require('../../../models/products/Category');
const sequelize = require('../../../databases/database').sequelize;

// Query datas from DB
module.exports.index = async (req, res ) => {
    try{
        const categories = await Category.findAll({
            order: [
            ['id', 'DESC']
        ],
            // attributes: ["id", "name", "description", "updatedat", "createdat"]
        });
        
        res.json({
            result: 'ok',
            data: categories,
            message: "Query list of categories successfully"
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `Query list of categories failed. Error: ${error}`
        });
    }
}

// Query 1 data from DB
module.exports.show = async (req, res) => {
	let id = req.params.id;

	try{
        const categories = await Category.findAll({
            where: {
                id
            }
        });

        const products = await Product.findAll({
            order: [['created_at', 'DESC']],
            attributes: ["id", "name", "price", "description", "image", "category", "brand", "sold_out", "updated_at", "created_at"],
            where: {
            	category: id 
            }
        });

        if(categories.length > 0){
        	res.json({
        		result: 'ok',
	            data: categories,
                productsOfCategory: products,
	            message: `query Category by id successfully`
        	});
        }else{
        	res.json({
        		result: 'failed',
	            data: {},
	            message: `Cannot find Category to update`
        	});
        }
        
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query Category by id failed. Error: ${error}`
        });
    }
}

// Create new data in DB
module.exports.create = async (req, res ) => {
    let { name, description} = req.body;
    try{
        let newCategory = await Category.create({
            name,
            description,
        }, {
            fields: ["name", "description", "updated_at", "created_at"]
        });

        if(newCategory){
            res.json({
                result: 'ok',
                data: newCategory,
                message: `Create new Category successfully`
            });
        }else {
            res.json({
                result: 'failed',
                data: {},
                message: `Insert a new Category failed`
            });
        }
    }catch(error){
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new Category failed. Error: ${error}`
        });
    }
}

// update date in DB
module.exports.update = async (req, res ) => {
    let { name, description} = req.body;
    let id = req.params.id;
    try{
        let categories = await Category.findAll({
            where: {
            	id
            }
        });

        if(categories.length > 0){
        	const update_product = await Category.update({
	            name: name ? name : categories.name,
	            description: description ? description : categories.description,
                updated_at: sequelize.fn('NOW')
	        }, {
	            where: {
	                id
	            }
	        });

        	categories = await Category.findAll({
	            where: {
	            	id
	            }
	        });

        	res.json({
                result: 'ok',
                data: categories,
                message: `update a category successfully`
            });
        }else {
        	res.json({
                result: 'failed',
                data: {},
                message: `Cannot find category to update`
            });
        }
    }catch(error){
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update a category. Error: ${error}`
        });
    }
}

// Delete data in DB
module.exports.delete = async (req, res) => {
	let id = req.params.id;
	try{
		let numberOfCategory = await Category.destroy({
            where: {
                id
            }
        });

        if(numberOfCategory > 0){
        	res.json({
                result: 'ok',
                message: `Delete a category successfully`,
                count: numberOfCategory
            });
        }else{
        	res.json({
                result: 'failed',
                data: {},
                message: `Cannot find category to delete`
            });
        }
	}catch(error){
		res.json({
            result: 'failed',
            data: {},
            message: `Cannot delete a category. Error: ${error}`
        });
	}
}