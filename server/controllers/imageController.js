import userModel from '../models/userModel.js';
import fs from 'node:fs'; // if you want to save locally (optional)
import axios from 'axios';
import FormData from 'form-data';

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

    // Prepare payload for Stability AI v2beta ultra endpoint
    const payload = {
      prompt,
      output_format: "png",  // png or webp, choose what you prefer
      // Optional: width, height, samples etc. based on docs
      // width: 512,
      // height: 512,
      // samples: 1,
    };

    // Send request using axios.postForm
    const response = await axios.postForm(
      'https://api.stability.ai/v2beta/stable-image/generate/ultra',
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined,
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${process.env.DREAMSTUDIO_API_KEY}`,
          Accept: 'image/*',
        },
      }
    );

    if (response.status !== 200) {
      // Throw error with status and response body text
      throw new Error(`${response.status}: ${response.data.toString()}`);
    }

    // Convert image binary data to base64 string for sending in JSON response
    const base64Image = Buffer.from(response.data).toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct one credit from user
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { creditBalance: -1 } },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Image generated successfully',
      resultImage,
      creditBalance: updatedUser.creditBalance,
    });

  } catch (error) {
    console.error('Error generating image:', error.message);
    res.status(500).json({ error: 'An error occurred while generating the image.' });
  }
};
