import axios from "axios";
import { getAllIdAndAppName } from "../../utils/getAllIdAndAppName.mjs";
import { verifyThisUnknownApp } from "../../utils/verifyApp.mjs";

const investAppPatchRequest = async (req, res, next) => {
    const {investorAppid, investorAppName, investorId, dataToBeChanged, investorPostId} = req.body;
    if(investorAppid === undefined || investorAppName === undefined || investorId === undefined || investorPostId === undefined || Object.keys(dataToBeChanged).length === 0) {
        return res.status(400).send(
            {
                status: 400,
                message: 'Bad Request!, Missing parameters!',
                error: null
            }
        )
    }
    const isThisGuyValid = await verifyThisUnknownApp({invAppName: investorAppName, id: investorAppid}, 1);
    if(!isThisGuyValid){
        return res.status(401).send(
            {
                status: 401,
                message: 'Invalid Auhtorization, App not registered with our network!',
                error: null
            }
        )
    };
    const allRegisteredProjectApps = await getAllIdAndAppName();
    let failCount = 0;
    let sendedAppList = [];
    allRegisteredProjectApps.forEach( async (projectApp) => {
        const res = await axios.patch(projectApp.investorPatchRequest, {
            'investorAppid': investorAppid,
            'investorAppName': investorAppName,
            'investorId': investorId,
            'dataToBeChanged': JSON.stringify(dataToBeChanged), 'investorPostId': investorPostId
        })
        if(res.ok){
            sendedAppList.push(projectApp.projAppName);
        }else {
            failCount++;
        }
    });
    return res.status(200).send(
        {
            status: 200,
            message: 'The data had been updated to follwing apps',
            data: sendedAppList,
            error: null
        }
    )
}

export {
    investAppPatchRequest
}