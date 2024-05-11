import axios from "axios";
import { getAllIdAndAppName } from "../../utils/getAllIdAndAppName.mjs";
import { verifyThisUnknownApp } from "../../utils/verifyApp.mjs";

const projectAppUpdate = async (req, res, next) => {
    const {projectAppId, projectAppName, projectPostid, projectUserId, dataToBeChanged} = req.body;
    if(projectAppId === undefined || projectAppName === undefined || projectPostid === undefined || projectUserId === undefined || Object.keys(dataToBeChanged).length === 0) {
        return res.status(400).send(
            {
                status: 400,
                message: 'Bad request!, Missing paramenter!',
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
    const allInvestorApp = await getAllIdAndAppName(1);
    let failCount = 0;
    let sendedApp = [];
    allInvestorApp.forEach(async (investorApp) => {
        const result = await axios.patch(investorApp.investorPatchProjectApi, {
            'id': projectAppId,
            'projAppName': projectAppName,
            'projectPostid': projectPostid,
            'projectUserId': projectUserId,
            'dataToBeChanged': JSON.stringify(dataToBeChanged)
        })

        if(result.ok) {
            sendedApp.push(investorApp.invAppName);
        }else{
            failCount++;
        }
    })
    return res.status(200).send(
        {
            status: 200,
            message: 'Success!',
            error: null,
            failCount: failCount,
            sendedApp: sendedApp
        }
    )
}

export {
    projectAppUpdate
}