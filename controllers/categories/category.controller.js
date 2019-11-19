// Models
const Product = require('../../models/products/Product');
const Category = require('../../models/products/Category');
const Brand = require('../../models/products/Brand');
const sequelize = require('../../databases/database').sequelize;

// show list of products
module.exports.index = async (req, res ) => {
    try{
        const categories = await Category.findAll({
            order: [
            ['created_at', 'DESC']
        ]
        });
        length = categories.length;
        
        res.render('categories/index',{
            categories,
            length
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query list of Categories failed. Error: ${error}`
        });
    }
}

// page create
module.exports.new = async (req, res ) => {
    try{
        res.render('categories/new');
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query failed. Error: ${error}`
        });
    }
}

// create product
module.exports.create = async (req, res ) => {

    var errors = [];
    if(!req.body.name){
        errors.push('Name is required.');
    }
    if(!req.body.description){
        errors.push('Description is requiresd.');
    }
    if(errors.length){
        res.render('categories/new',{
            errors: errors,
            values: req.body,
        });
        return;
    }

    let { name, description} = req.body;
    
    try{
        let newCategory = await Category.create({
            name,
            description,
        }, {
            fields: ["name", "description", "created_at", "updated_at"]
        });

        if(newCategory){
            res.redirect('/categories');
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

// show 1 category
module.exports.show = async (req, res ) => {
    let id = req.params.id;
    console.log(id);
    try{
        const category = await Category.findAll({
            where: {
                id: id
            }
        });

        const products = await Product.findAll({
            where: {
                category: id
            }
        });
        length = products.length;

        res.render('categories/show', {
            category: category[0],
            products,
            length
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query failed. Error: ${error}`
        });
    }
}

// page edit
module.exports.edit = async (req, res ) => {
    let id = req.params.id;
    try{
        const category = await Category.findAll({
            where: {
                id: id
            }
        });

        res.render('categories/edit', {
            category: category[0],
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query failed. Error: ${error}`
        });
    }
}

// update
module.exports.update = async (req, res) => {
    let { name, description} = req.body;
    let id = req.params.id;
    
    try{
        const update_category = await Category.update({
            name,
            description,
            updated_at: sequelize.fn('NOW')
        }, {
            where: {
                id : id
            }
        });
        res.redirect('/categories/'+id);
        
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
        await Category.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/categories');
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `Error: ${error}`
        });
    }
}