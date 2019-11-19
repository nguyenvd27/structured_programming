// Models
const Product = require('../../models/products/Product');
const Category = require('../../models/products/Category');
const Brand = require('../../models/products/Brand');
const sequelize = require('../../databases/database').sequelize;


// show list of brands
module.exports.index = async (req, res ) => {
    try{
        const brands = await Brand.findAll({
            order: [
            ['created_at', 'DESC']
        ]
        });
        length = brands.length;
        
        res.render('brands/index',{
            brands,
            length
        });
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query list of brands failed. Error: ${error}`
        });
    }
}

// page create
module.exports.new = async (req, res ) => {
    try{
        res.render('brands/new');
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `query failed. Error: ${error}`
        });
    }
}

// create brand
module.exports.create = async (req, res ) => {

    var errors = [];
    if(!req.body.name){
        errors.push('Name is required.');
    }
    if(!req.body.description){
        errors.push('Description is requiresd.');
    }
    if(errors.length){
        res.render('brands/new',{
            errors: errors,
            values: req.body,
        });
        return;
    }

    let { name, description} = req.body;
    
    try{
        let newBrand = await Brand.create({
            name,
            description,
        }, {
            fields: ["name", "description", "created_at", "updated_at"]
        });

        if(newBrand){
            res.redirect('/brands');
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

// show 1 brand
module.exports.show = async (req, res ) => {
    let id = req.params.id;
    console.log(id);
    try{
        const brand = await Brand.findAll({
            where: {
                id: id
            }
        });

        const products = await Product.findAll({
            where: {
                brand: id
            }
        });
        length = products.length;

        res.render('brands/show', {
            brand: brand[0],
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
        const brand = await Brand.findAll({
            where: {
                id: id
            }
        });

        res.render('brands/edit', {
            brand: brand[0],
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
        const update_brand = await Brand.update({
            name,
            description,
            updated_at: sequelize.fn('NOW')
        }, {
            where: {
                id : id
            }
        });
        res.redirect('/brands/'+id);
        
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `Error: ${error}`
        });
    }
}

// delete brand
module.exports.delete = async (req, res) => {
    let id = req.params.id;

    try{
        await Brand.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/brands');
    } catch (error){
        res.json({
            result: 'failed',
            data: [],
            message: `Error: ${error}`
        });
    }
}