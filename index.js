express = require("express");
const dotenv = require("dotenv");
require("./db/connection");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();
app.use(express.json());

//middlewares
app.use("/api",authRoutes);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server started....");
})

