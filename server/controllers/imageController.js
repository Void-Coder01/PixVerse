import userModel  from '../models/userModel.js'
import FormData from 'form-data'
import axios from 'axios';

export const generateImage = async (req,res) => {
    try {
        const { prompt } = req.body;
        const userID = req.userID;

        const user = await userModel.findById(userID);

        if(!user || !prompt){
            return res.status(401).json({
                success : false,
                message : "missing details"
            })
        }

        if(user.creditBalance === 0 || user.creditBalance < 0){
            return res.status(403).json({
                status : false,
                message : "Not enought credit points"
            })
        }

        const formData = new FormData()
        formData.append('prompt', prompt)


        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData, {
            headers:{
                'x-api-key' : process.env.CLIPDROP_API
            },
            responseType : 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(
            user._id, 
            {creditBalance : user.creditBalance-1 }
        )

        return res.json({
            success : true,
            message : "Image Generated",
            creditBalance : user.creditBalance-1,
            resultImage
        })

    } catch (error) {
        console.log(error.message);
        return res.status(501).json({
            success:false,
            msg : error.message
        })  
    }   
}

