import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from 'colors';
import products from './data/products.js'
import users from './data/users.js'
import User from './models/userSchema.js';
import Order from './models/orderSchema.js';
import Product from './models/productSchema.js'
import connectDB from "./database/db.js";

dotenv.config();
connectDB();

const importData=async()=>{
    try {
        await Product.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();

        const createUser=await User.insertMany(users);
        const adminUser=createUser[0]._id;

        const sampleProducts=products.map((product)=>{
            return{...product,user:adminUser}
        })
        await Product.insertMany(sampleProducts);
        
         console.log(colors.green.inverse("Data Imported"));
         process.exit()

    } catch (error) {
        console.error(colors.red.inverse("Error with data import"));
        process.exit(1)
        
    }
}

const destroyData = async()=>{
    try {
        await Product.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed'.red.inverse)
        process.exit()
}catch(error){
    console.error(colors.red.inverse('Error with data destruction'))
    process.exit(1)
}
}

if(process.argv[2]=='-d'){
    destroyData()
}else{
    importData()
}