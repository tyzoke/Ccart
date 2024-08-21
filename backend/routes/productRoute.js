import express from 'express'
//import asyncHandler from '../middleware/asyncHandler.js';
//import Product from '../models/productSchema.js'
// import {getProductByID} from '../controllers/productSingle.js'
 import {getProducts,getProductByID,getTopProducts, deleteProduct} from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMiddleware.js'
const router =express.Router()


 router.route('/').get(getProducts) 

// router.get('/',asyncHandler(async(req,res)=>{
//     const products = await Product.find({})
//     // throw new Error('Product Found')
//     res.json(products);
// }))

 router.route('/:id').get(getProductByID).delete(protect,admin,deleteProduct)
 

// router.get('/:id',asyncHandler(async(req,res)=>{
    
//     const product =await Product.findById(req.params.id)
//     if(product){
//                  return res.send(product);
//                } else {
//                 res.status(404)
//                 throw new Error('Product not found')
//                }

//     //res.send(404).json({message:'Product not Found'})
// }))
router.route('/top').get(getTopProducts)

export default router
