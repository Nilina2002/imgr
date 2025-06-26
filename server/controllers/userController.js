import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        } 

        //encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData ={
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.json({
            success: true,
            token, user: {
                name:user.name
            }
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in registration",
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.json({
            success: true,
            token, user: {
                name:user.name
            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in login",
        })
    }
}

const userCredits = async (req, res) => {
    try{
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        res.json({
            success: true,
            credits: user.creditBalance,user: {
                name: user.name }
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in fetching user credits",
        });
    }
}

export { registerUser, loginUser, userCredits };
