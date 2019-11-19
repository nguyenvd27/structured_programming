// Models
const Product = require('../../../models/products/Product');
const Category = require('../../../models/products/Category');

const sequelize = require('../../../databases/database').sequelize;

// Query datas from DB
module.exports.index = async (req, res ) => {
    try{
        const products = await Product.findAll({
            order: [
            ['created_at', 'DESC']
            ]
        });
        res.json({
            result: 'ok',
            data: products,
            message: "Query list of products successfully"
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `Query list of products failed. Error: ${error}`
        });
    }
}

// Query 1 data from DB
module.exports.show = async (req, res) => {
	let id = req.params.id;

	try{
        const products = await Product.findAll({
            // attributes: ["id", "name", "price", "description", "image", "category", "brand", "sold_out", "updated_at", "created_at"],
            where: {
            	id
            }
        });

        if(products.length > 0){
        	res.json({
        		result: 'ok',
	            data: products,
	            message: `query product by id successfully`
        	});
        }else{
        	res.json({
        		result: 'failed',
	            data: {},
	            message: `Cannot find Product to update`
        	});
        }
        
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query product by id failed. Error: ${error}`
        });
    }
}

// Create new data in DB
module.exports.create = async (req, res ) => {
    let { name, price, description, image, category, brand, sold_out} = req.body;
    try{
        let newProduct = await Product.create({
            name,
            price,
            description,
            image,
            category,
            brand,
            sold_out
        }, {
            fields: ["name", "price", "description", "image", "category", "brand", "sold_out", "created_at", "updated_at"]
        });

        if(newProduct){
            res.json({
                result: 'ok',
                data: newProduct,
                message: `Create new products successfully`
            });
        }else {
            res.json({
                result: 'failed',
                data: {},
                message: `Insert a new product failed`
            });
        }
    }catch(error){
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new product failed. Error: ${error}`
        });
    }
}

// update date in DB
module.exports.update = async (req, res ) => {
    let { name, price, description, image, category, brand, sold_out} = req.body;
    let id = req.params.id;
    try{
        let products = await Product.findAll({
            // attributes: ["name", "price", "description", "image", "category", "brand", "sold_out"],
            where: {
            	id
            }
        });
        
        if(products.length > 0){
        	const update_product = await Product.update({
	            name: name ? name : products.name,
	            price: price ? price : products.price,
	            description: description ? description : products.description,
	            image: image ? image : products.image,
	            category: category ? category : products.category,
	            brand: brand ? brand : products.brand,
	            sold_out: sold_out ? sold_out : products.sold_out,
                updated_at: sequelize.fn('NOW')
	        }, {
	            where: {
	                id
	            }
	        });

        	products = await Product.findAll({
	            where: {
	            	id
	            }
	        });

        	res.json({
                result: 'ok',
                data: products,
                message: `update a product successfully`
            });
        }else {
        	res.json({
                result: 'failed',
                data: {},
                message: `Cannot find product to update`
            });
        }
    }catch(error){
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update a product. Error: ${error}`
        });
    }
}

// Delete data in DB
module.exports.delete = async (req, res) => {
	let id = req.params.id;
	try{
		let numberOfProduct = await Product.destroy({
            where: {
                id
            }
        });

        if(numberOfProduct > 0){
        	res.json({
                result: 'ok',
                message: `Delete a product successfully`,
                count: numberOfProduct
            });
        }else{
        	res.json({
                result: 'failed',
                data: {},
                message: `Cannot find product to delete`
            });
        }
	}catch(error){
		res.json({
            result: 'failed',
            data: {},
            message: `Cannot delete a product. Error: ${error}`
        });
	}
}