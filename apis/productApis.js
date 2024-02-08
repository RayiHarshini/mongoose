//import db schema
const Product = require("../model/Product")
//get all products
const products_all = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products)
        console.log('Data Sent')
    }
    catch (error) {
        res.status(400).send({ 'message': error })
    }
}
//insert a product
const insert_product = async (req, res) => {
    const product = new Product({
        p_id: req.body.p_id,
        p_name: req.body.p_name,
        p_cost: req.body.p_cost
    })
    try {
        const savedProduct = await product.save()
        console.log('Product Inserted')
        res.status(200).send(savedProduct)
    }
    catch (error) {
        res.status(400).send(error)
    }
}
//update product
const update_product = async (req, res) => {
    let p_id = req.body.p_id
    const product = {
        p_name: req.body.p_name,
        p_cost: req.body.p_cost
    }
    try {
        const updatedProduct = await Product.updateOne(
            { p_id }, product
        )
        if (updatedProduct.modifiedCount != 0) {
            console.log('Product Updated', updatedProduct)
            res.status(200).send({ 'update': 'success' })
        }
        else {
            console.log('Product Not Updated')
            res.status(200).send({ 'update': 'failed' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}
//delete product
const delete_product = async (req, res) => {
    let p_id = req.body.p_id
    try {
        const deletedProduct = await Product.deleteOne(
            { p_id: p_id }
        )
        if (deletedProduct.deletedCount != 0) {
            console.log('Product Deleted')
            res.status(200).send({ 'delete': 'success' })
        }
        else {
            console.log('Product Not Deleted')
            res.status(200).send({ 'delete': 'failed' })
        }
    } catch (error) {
        res.status(400).send(error)
    }
}




module.exports = {
    products_all,
    insert_product,
    update_product,
    delete_product
}
