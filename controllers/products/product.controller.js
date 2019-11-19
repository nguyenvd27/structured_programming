// Models
const Product = require('../../models/products/Product');
const Category = require('../../models/products/Category');
const Brand = require('../../models/products/Brand');
const sequelize = require('../../databases/database').sequelize;

// show list of products
module.exports.index = async (req, res ) => {
    try{
        const products = await Product.findAll({
            order: [
            ['created_at', 'DESC']
        ],
        });
        length = products.length;
        
        const categories = await Category.findAll();
        const brands = await Brand.findAll();

        res.render('products/index',{
            products,
            length,
            categories,
            brands
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query list of Products failed. Error: ${error}`
        });
    }
}

// page create product
module.exports.new = async (req, res ) => {
    try{
        const categories = await Category.findAll();
        const brands = await Brand.findAll();

        res.render('products/new',{
            categories,
            brands
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query list of Products failed. Error: ${error}`
        });
    }
}

// create product
module.exports.create = async (req, res ) => {

    var errors = [];
    if(!req.body.name){
        errors.push('Name is required.');
    }
    if(!req.body.price){
        errors.push('Price is required.');
    }
    if(!req.body.description){
        errors.push('Description is requiresd.');
    }
    if(!req.body.category){
        errors.push('Category is requiresd.');
    }
    if(!req.body.brand){
        errors.push('Brand is requiresd.');
    }
    if(!req.body.sold_out){
        errors.push('Sold out is requiresd.');
    }
    if(!req.body.image){
        errors.push('Image is requiresd.');
    }
    if(errors.length){
        const categories = await Category.findAll();
        const brands = await Brand.findAll();

        res.render('products/new',{
            errors: errors,
            values: req.body,
            categories,
            brands
        });
        return;
    }


    let { name, price, description, category, brand, sold_out, image} = req.body;
    
    try{
        let newProduct = await Product.create({
            name,
            price,
            description,
            image,
            category: parseInt(category),
            brand: parseInt(brand),
            sold_out
        }, {
            fields: ["name", "price", "description", "image", "category", "brand", "sold_out", "updated_at", "created_at"]
        });

        if(newProduct){
            res.redirect('/products');
        }else {
            res.json({
                result: 'failed',
                data: {},
                message: `Insert a new Product failed`
            });
        }
    }catch(error){
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new Product failed. Error: ${error}`
        });
    }
}

// show 1 product
module.exports.show = async (req, res ) => {
    let id = req.params.id;
    console.log(id);
    try{
        const product = await Product.findAll({
            where: {
                id: id
            }
        });
        
        const category = await Category.findAll({
            where: {
                id: product[0].category
            }
        });
        category_name = category[0].name;

        const brand = await Brand.findAll({
            where: {
                id: product[0].brand
            }
        });
        brand_name = brand[0].name;

        res.render('products/show', {
            product: product[0],
            category_name,
            brand_name
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query product failed. Error: ${error}`
        });
    }
}

// page edit product
module.exports.edit = async (req, res ) => {

    let id = req.params.id;

    try{
        const product = await Product.findAll({
            where: {
                id: id
            }
        });

        const categories = await Category.findAll();
        const brands = await Brand.findAll();

        res.render('products/edit', {
            product: product[0],
            categories,
            brands
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query product failed. Error: ${error}`
        });
    }
}

// update product
module.exports.update = async (req, res) => {
    let { name, price, description, category, brand, sold_out, image} = req.body;
    let id = req.params.id;
    
    try{
        const update_product = await Product.update({
            name,
            price,
            description,
            image,
            category: parseInt(category),
            brand: parseInt(brand),
            sold_out,
            updated_at: sequelize.fn('NOW')
        }, {
            where: {
                id : id
            }
        });

        res.redirect('/products/'+id);
        
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `Error: ${error}`
        });
    }
}

// delete product
module.exports.delete = async (req, res) => {
    let id = req.params.id;

    try{
        await Product.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/products');
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `Error: ${error}`
        });
    }
}