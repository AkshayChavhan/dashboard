import User from "../models/User.js"
import asyncHandler from "express-async-handler";
import jwtToken from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generateToken = (id) => {
  return jwtToken.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error(`Please enter the required fields like ${name}, ${email}, and ${password}`);
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Please enter a minimum of 6 characters in the password");
  }
  if (password.length > 23) {
    res.status(400);
    throw new Error("Please enter a maximum of 23 characters in the password");
  }

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    console.log("isEmailExist => ", isEmailExist);
    res.status(400);
    throw new Error("Email has already been registered");
  }

  // Hash the user's password before saving it
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new user with the hashed password
  const user = await User.create({
    name,
    email,
    password: hashedPassword, // Store the hashed password
  });

  // create token
  const token = generateToken(user._id);

  // send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 Day
    sameSite: "none",
    secure: false,
  });

  if (user) {
    const { _id, name, email, city, state, country, occupation, phoneNumber, transactions } = user;
    res.status(201).json({
      _id,
      name,
      email,
      city,
      state,
      country,
      occupation,
      phoneNumber,
      transactions,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong while creating a new user");
  }
});



export default registerUser;