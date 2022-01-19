const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//connect to db
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("Connected to Database Port",process.env.PORT))
// console.log(process.env.MONGO_URL);
// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{
//     console.log("Connected!")
// })