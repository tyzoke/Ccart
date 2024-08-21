import asyncHandler from "../middleware/asyncHandler.js"
import Product from '../models/productSchema.js'

// get all products
// GET http://localhost:port/products
//access Public
const getProducts=asyncHandler(async(req,res)=>{
    
    const keyword=req.query.keyword ? {name:{ $regex:req.query.keyword, $options:'i'}}:{};
    
    const count=await Product.countDocuments({...keyword});
    // console.log(count);
    const products=await Product.find({...keyword})
    res.json(products);
    
 //   const products = await Product.find({})
//     // throw new Error('Product Found')
//     res.json(products);
    
    // Product.find().then(products=>{
    //     res.json(products)
    //     }).catch(err=>{
    //         console.error(err)
    //         res.status(500).json({message:"Error fetching products"})
    //         })
})


// get single products
// GET http://localhost:port/product/:id
//access Public
const getProductByID=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)

    if(product){
       return res.send(product)
    }else{
        res.status(404)
        throw new Error("Product not found")
    }
})

//get top rated products
// GET http://localhost:port/products/top
//access Public
const getTopProducts=async(req,res)=>{
    const products=await Product.find({}).sort({rating:-1}).limit(3)
    res.status(200).json(products)
    }

//get delete product
// DELETE http://localhost:3000/products/:id
//access admin
const deleteProduct=asyncHandler(async(req,res)=>{
    console.log("in delete product controller");
    console.log("checking " +req.params.id)
    const product=await Product.findById(req.params.id)
    if(product){
        await Product.deleteOne({_id:product._id});
        res.status(200).json({message:"Product deleted successfully"})
        }else{
            res.status(404).json({message:"Product not found"})
            }
}  );  



export { getProducts,getProductByID,getTopProducts,deleteProduct}