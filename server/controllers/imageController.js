import userModel from '../models/userModel.js';
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req, res) => {
    try {
        const userId = req.userId; // from auth middleware
        const { prompt } = req.body;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        if (!prompt) return res.status(400).json({ success: false, message: "Prompt is required" });

        if (user.creditBalance <= 0) {
            return res.status(403).json({
                success: false,
                message: "Insufficient credits",
                creditBalance: user.creditBalance
            }); 
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                ...formData.getHeaders(),
                'x-api-key': process.env.CLIPDROP_API
            },
            responseType: 'arraybuffer',
        });

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $inc: { creditBalance: -1 } },
            { new: true }
        );

        res.json({
            success: true,
            message: "Image generated successfully",
            resultImage,
            creditBalance: updatedUser.creditBalance
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'An error occurred while generating the image.' });
    }
}
