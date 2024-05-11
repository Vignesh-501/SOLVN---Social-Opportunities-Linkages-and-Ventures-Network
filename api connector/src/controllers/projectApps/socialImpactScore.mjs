import axios from "axios";
import { verifyThisUnknownApp } from "../../utils/verifyApp.mjs";

const socialImpactScore = async (req, res, next) => {
    const {projectAppId, projectAppName, projectName, projectOwner, projectEstimate, projectRevenueModel, projectContactInfo, processed_str, image_urls} = req.body;
    if (projectAppId === undefined || projectAppName === undefined ||  projectName === undefined || projectOwner === undefined ||  projectEstimate === undefined ||  projectRevenueModel === undefined || projectContactInfo === undefined || processed_str === undefined || image_urls.length === 0) {
        return res.status(400).send(
            {
                status: 400,
                message: 'Bad Request!, Missing required parameter!',
                error: null
            }
        )
    }
    const isThisGuyValid = await verifyThisUnknownApp({projAppName: projectAppName, id: projectAppId});
    if(!isThisGuyValid) {
        return res.status(401).send(
            {
                status: 401,
                message: 'Authorization Error!',
                error: null
            }
        )
    }
    const socialImpactScore = await axios.post('http://192.168.170.129:8080/evaluate_social_impact', {
        'projectAppId': projectAppId,
        'projectAppName': projectAppName,
        'projectName': projectName,
        'projectOwner': projectOwner,
        'projectEstimate': projectEstimate,
        'projectRevenueModel': projectRevenueModel,
        'projectContactInfo': projectContactInfo
    })
    console.log(socialImpactScore.data);
    if(socialImpactScore.status === 200) {
        return res.status(200).send(
            {
                ...socialImpactScore.data.data
            }
        )
    }
}

export {
    socialImpactScore
}