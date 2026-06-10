 import { User } from "../models/user.model.js";

 const registerUser = async (req, res) => {
    try {
        const { username, email, password} = req.body;

        //basic vaidation

        if (!username || !email || !password) {
            return res.status(400).json({message:"All fields are required!"});
        }

        //check if user exists already

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "user already exists!"});
        }

        //create user, remember not User

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({ 
            message: "User registered!",
            //to get the id of the user created by mongoDB amongst other details of the user
            user: { id: user._id, email: user.email, username: user.username}
        });


    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message});
        
    }
    
 };

 //to create login setup
 const loginUser = async (req, res) => {

    console.log(req.body);

    try {

        //checking if user already exists
        const {email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        console.log(user);

        if (!user) return res.status(400).json({
            message: "User not found"
        });


        //comparing passwords
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        res.status(200).json({
            message: " User logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }

        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
 }
 //export and save
 export {
    registerUser,
    loginUser
 }