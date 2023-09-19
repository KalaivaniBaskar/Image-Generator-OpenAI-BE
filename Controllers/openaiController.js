const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv")
dotenv.config();

const configuration = new Configuration({
  organization : process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_APIKEY
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    const {prompt, size } = req.body; 
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? 
                        '512x512' : '1024x1024'
    try{
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize
        });
        const  imageUrl = response.data.data // array of obj, each obj with key 'url'
        res.status(200).json({
            success:true,
            data : imageUrl
        });
    }
    catch(error){
        
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
          res.status(400).json({
            success:false,
            message: 'The image could not be generated ' + error?.response.data.error.code
        });
    }
}

module.exports = {generateImage}