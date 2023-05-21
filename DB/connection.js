import mongoose from "mongoose";

const connection=async()=>{
    return await mongoose.connect(process.env.DBCONNECTION)
    .then(()=>{
        console.log("DB Connected");
    }).catch(()=>{
        console.log("DB Error");
    })
}

export default connection;