import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import clientRoutes from "./routes/client.js";
import managementRoutes from "./routes/management.js";
import generalRoutes from "./routes/general.js";
import salesRoutes from "./routes/sales.js";


import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStats from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStats from "./models/OverallStats.js";
import AffiliateStat from "./models/AffiliateStats.js";


// import
import { dataUser , dataProduct , dataProductStat , dataTransaction , dataOverallStat ,dataAffiliateStat } from "./data/index.js";


// configuration
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(cors());




// ROUTE
app.use("/client" , clientRoutes);
app.use("/general" , generalRoutes);
app.use("/management" , managementRoutes);
app.use("/sales" , salesRoutes);



// MONGODB SETUP
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGODB_URL , {
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(()=>{
    app.listen(PORT ,async ()=> {
        // await AffiliateStat.insertMany(dataAffiliateStat);
        // await OverallStats.insertMany(dataOverallStat);
        // await Product.insertMany(dataProduct);
        // await ProductStats.insertMany(dataProductStat);
        // await Transaction.insertMany(dataTransaction);
        console.log("server port ",PORT )
    })
}).catch((err) => {
    console.log(`${err} did not connect.`)
})




