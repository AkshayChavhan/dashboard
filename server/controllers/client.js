import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transactions from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find();

        const productsWithStats = await Promise.all(
            products.map(async(product)=>{
                const stat = await ProductStat.find({
                    productId : product._id
                })
                return {
                    ...product._doc , 
                    stat ,
                }
            })
        )
        res.status(200).json(productsWithStats);
        
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const getCustomers = async (req,res) => {
    try {
        const customers = await User.find( { role: "user" }).select("-password");
        console.log("customers => ", customers);
        res.status(200).json(customers);  
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


export const getTransactions = async (req,res) => {
    try {
        // sort should be look like this:{ "field":"userid" ,"sort" :"desc"}
        const { page = 1 , pageSize=20 ,sort=null , search="" } = req.query;

        const generalSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field] : sortParsed.sort = "asc" ? 1 : -1 
            }

            return sortFormatted;
        }

        const sortFormatted = Boolean(sort) ? generalSort() : {}

        const transactions = await Transactions.find({
            $or : [
                { cost : { $regex : new RegExp(search ,"i")}},
                { userId : { $regex : new RegExp(search ,"i")}}
            ]
        })
        .sort(sortFormatted)
        .skip( page * pageSize)
        .limit(pageSize);

        const total =  await Transactions.countDocuments({
            name : { $regex : search , $options : "i"}
        });

        res.status(200).json({
            transactions ,
            total
        });  
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const getGeography = async (req,res) => {
    try {
        const user = await User.find();

        const mappedLocations = user.reduce((acc , { country }) => {
            const countryISO3 = getCountryIso3(country);
            if(!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        } , {});

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country ,count]) => {
                return { id : country , value : count }
            }
        )
        res.status(200).json(formattedLocations);  
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

