import User from "../models/User.js"
import asyncHandler from "express-async-handler";
import jwtToken from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generateToken = (id) => {
    return jwtToken.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.clear();
    console.log("email, password => ", email, password);
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter the Email and Password.")
    }

    const isEmailExist = await User.findOne({ email });


    if (!isEmailExist) {
        console.log("isEmailExist => ", isEmailExist);
        res.status(400)
        throw new Error("User does not exist ,please signup first.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, isEmailExist.password);

    console.log("isPasswordCorrect => ", isPasswordCorrect);
    // create token
    const token = await generateToken(isEmailExist._id);

    // send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),  //1 Day
        sameSite: "none",
        secure: false,
    })

    if (isEmailExist && isPasswordCorrect) {
        const { _id, name, email, city, state, country, occupation, phoneNumber,
            transactions } = isEmailExist;
        console.log("fimnal => ", _id, name, email, city, state, country, occupation, phoneNumber,
            transactions);
        res.status(201).json({
            _id, name, email, city, state, country, occupation, phoneNumber,
            transactions, token
        })
    } else {
        res.status(400)
        throw new Error("Invalid user email or password.");
    }
})

export default loginUser;