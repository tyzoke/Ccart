
const notFound=(req,res,next)=>{
    const  error =new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
    // res.json({
    //     message:error.message,
    //     stack:process.env.NODEENV ==='production'? '#####' : error.stack
    // })

}

const errorHandler=(err,req,res,next)=>{
    let statusCode=res.statusCode===200?500:res.statusCode;
    let message=err.message

    if(err.name==='CastError' && err.Kind ==='ObjectId'){
        message=`Resource not found errorMiddleware`
        statusCode=404
    }

//multiple req send that's why i stop it

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production'? '#####' : err.stack
    })
}

export { notFound,errorHandler}