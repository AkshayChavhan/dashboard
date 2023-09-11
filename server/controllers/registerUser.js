const registerUser = async (req, res) => {
  try {
   console.log("register user")
    res.status(200).json("register user");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export default registerUser;