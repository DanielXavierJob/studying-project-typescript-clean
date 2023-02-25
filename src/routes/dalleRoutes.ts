import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-wDw4ge0AdGzWooXMnmrhASZy",
});

const openai = new OpenAIApi(configuration);

const teste = async () => {
  const response = await openai.createImage({
    prompt: "A cute baby sea otter",
    n: 2,
    size: "1024x1024",
  });
  console.log(response)
};

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 10,
      size: "1024x1024",
      response_format: "b64_json",
    });
    console.log(aiResponse)
    // const image = aiResponse.data.data[0].b64_json;
    const image = aiResponse.data.data;
    res.status(200).json({ photos: image });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

console.log(router)
export default router;
