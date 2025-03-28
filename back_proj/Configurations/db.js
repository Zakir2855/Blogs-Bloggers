const mongoose=require("mongoose");
function Connect(){
    mongoose.connect(process.env.MONGO_DB_URI+process.env.DB_NAME).then(()=>{
        console.log("db is connected")
    }).catch((err)=>{
        console.log(err);
    })
};
module.exports={Connect};