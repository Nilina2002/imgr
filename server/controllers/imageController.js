import userModel from '../models/userModel.js';
import axios from 'axios';

export const generateImage = async (req, res) => {
  try {
    const userId = req.userId;
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

    // Generate image using DreamStudio
    const dreamStudioResponse = await axios.post(
  'https://api.stability.ai/v1beta/generation/stable-diffusion-v2-1/text-to-image',
  {
    prompt,
    width: 512,
    height: 512,
    samples: 1,
    seed: Math.floor(Math.random() * 10000),
    steps: 50,
    cfg_scale: 7.0,
  },
  {
    headers: {
      'Authorization': `Bearer ${process.env.DREAMSTUDIO_API_KEY}`,
      'Content-Type': 'application/json'
    },
  }
);

    const imageUrl = dreamStudioResponse.data.images[0];

    // Deduct one credit
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { creditBalance: -1 } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Image generated successfully",
      imageUrl,
      creditBalance: updatedUser.creditBalance
    });

  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ error: 'An error occurred while generating the image.' });
  }
};
