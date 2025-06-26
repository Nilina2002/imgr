import userModel from '../models/userModel.js';

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt} = req.body;
        const user = await userModel.findById(userId);

        if(!user || !prompt){
            return res.json({
                success: false,
                message: "User not found or prompt is missing"
            })
        }

        if (user.creditBalance === 0 || userModel.creditBalance < 0) {
            return res.json({
                success: false,
                message: "Insufficient credits",
                creditBalance: user.creditBalance
            });
            
        }


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'An error occurred while generating the image.' });
    }

}