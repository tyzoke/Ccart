import mongoose from 'mongoose'
import colors from 'colors'

const connectDB=async()=>{
    try{
       const conn=await mongoose.connect(process.env.MONGO_URI)
       console.log(colors.bgGreen(`MongoDb Connected: ${conn.connection.host}`))
    }catch(error){
        console.log(colors.red.inverse(`Error: ${error.message}`))
        process.exit(1);
    }
}
export default connectDB