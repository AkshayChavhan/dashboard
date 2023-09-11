const loginUser = async (req, res) => {
    try {
        const { email , password } = req.body
        //   const { id } = req.params;
        //   const user = await User.findById(id);
        console.log(email ,password);
          res.status(200).json("email , password" , email , password);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default loginUser;