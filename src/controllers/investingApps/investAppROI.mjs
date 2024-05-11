import axios from "axios";
import { verifyThisUnknownApp } from "../../utils/verifyApp.mjs";


const investAppROI = async (req, res, next) => {
    const {projectAppId, projectAppName, projectName, investorAppId, investorAppName, projectId, projectDetails, projectBusinessModel, projectStage, projectRevenue, projectEstimate, investorAmountInvest } = req.body;
    if(projectAppId === undefined || projectAppName === undefined || projectName === undefined || investorAppId === undefined ||investorAppName === undefined || projectId === undefined ||projectDetails === undefined || projectBusinessModel === undefined || projectEstimate === undefined || projectRevenue === undefined || projectStage === undefined || investorAmountInvest === undefined) {
        return res.status(400).send(
            {
                status: 400,
                message: 'Bad request!, Missing required paramenters!',
                error: null
            }
        );
    };
    const isThisInvestingAppVerified = await verifyThisUnknownApp({invAppName: investorAppName, id: investAppROI}, 1);
    const isThisProjectAppVerified = await verifyThisUnknownApp({projAppName: projectAppName, id: projectAppId}, 2);
    if(!isThisInvestingAppVerified && !isThisProjectAppVerified) {
        return res.status(401).send(
            {
                status: 401,
                message: 'Authorization Error!',
                error: null
            }
        )
    };
    const result = await axios.post('http://192.168.170.129:8000/roi_project_analysis', {
        'projectAppId': projectAppId,
        'projectAppName': projectAppName,
        'projectName': projectName,
        'investorAppId': investorAppId,
        'investorAppName': investorAppName,
        'projectId': projectId,
        'projectDetails': projectDetails,
        'projectBusinessModel': projectBusinessModel,
        'projectEstimate': projectEstimate,
        'projectRevenue': projectRevenue,
        'projectStage': projectStage,
        'investorAmountInvest': investorAmountInvest
    })
    if(result) {
        console.log('After request');
        return res.status(200).send(
            {
                status: 200,
                message: 'Success!',
                data: result.data
            }
        )
    }
}

export {
    investAppROI
}