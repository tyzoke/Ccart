import express from 'express'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './database/db.js'
import colors from 'colors'
import dotenv from 'dotenv'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoutes.js'
import cookieParser from 'cookie-parser'


 dotenv.config();    //env setup
 connectDB()   //connection of DB
const app=express()

app.use(cookieParser());
app.use(express.json())  //to parse json data
 app.use(express.urlencoded({ extended : true }))

const port=4000
// const port = process.env.PORT || 8000;
// const app=express();
app.get('/',(req,res)=>{
    res.send('API is running')
})

// app.get('/products',(req,res)=>{
//     res.json(products);
// })

// app.get('/product/:id',(req,res)=>{
//     var product=products.find(p=>p._id===req.params.id)
//     res.send(product);
// })

app.use('/products',productRoute);
app.use('/users',userRoute);
app.use('/orders',orderRoute);
app.get('/config/paypal',(req,res)=>{
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
})
app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>
console.log(colors.yellow.inverse(`Server running at port ${port}`)))

