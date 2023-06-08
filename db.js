import mongoose, { connect } from "mongoose";

const connection = mongoose.connect(process.env.MONGOURI).then(()=>{
    console.log("Mongo Connected");
}).catch((err)=>{
    console.log(err);
})

export default connection;