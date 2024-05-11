import axios from "axios";
import { connectToDatabase } from "../../db/db.mjs";
import { projectAppModel } from "../../models/projectApp.mjs";
import { investingAppModel } from "../../models/investingApp.mjs";

const sendChat = async (req, res, next) => {
    // sentFrom - 1: From investor
    // sentFrom - 2: From project app
    const {invAppName, invAppId, projAppName, projAppId, invUserId, invUsername, invUserText, projUserId, projUserName, projUserText, sentFrom} = req.body;
    if(invAppName === undefined || invAppId === undefined || projAppName === undefined || projAppId === undefined || invUserId === undefined || invUserText === undefined || projUserId === undefined || projUserName === undefined || projUserText === undefined || sentFrom === undefined || invUsername === undefined) {
        return res.status(400).send(
            {
                staus: 400,
                message: 'Bad Request!, Missing parameter!',
                error: null
            }
        )
    }
    const isThisInvestingAppVerified = await verifyThisUnknownApp({invAppName: invAppName, id: invAppId}, 1);
    const isThisProjectAppVerified = await verifyThisUnknownApp({projAppName: projAppName, id: projAppId}, 2);
    if(!isThisInvestingAppVerified || !isThisProjectAppVerified) {
        return res.status(401).send(
            {
                status: 401,
                message: 'Authorization Error!',
                error: null
            }
        )
    };
    if(sentFrom == 1) {
        // Sent chat details to project app
        await connectToDatabase();
        const toSendApp = await projectAppModel().findOne({projAppName: projAppName, id: projAppId});
        if(toSendApp){
            const chatResult = axios.post(toSendApp.chatApi, {
                userId: projUserId,
                userName: projUserName,
                userText: projUserText
            });

            if(chatResult.ok){
                return res.status(200).send(
                    {
                        status: 200,
                        message: 'Message sended to client app',
                        error: null
                    }
                )
            }
        }else{
            return res.status(301).send(
                {
                    status: 301,
                    message: 'Something went wrong!',
                    error: null
                }
            )
        }
    }else{
        // Send chat details to investor app
        await connectToDatabase();
        const toSendApp = await investingAppModel().findOne({invAppName: invAppName, id: invAppId});
        if(toSendApp){
            const chatResult = axios.post(toSendApp.chatApi, {
                userId: invUserId,
                userName: invU,
                userText: invUserText
            });

            if(chatResult.ok){
                return res.status(200).send(
                    {
                        status: 200,
                        message: 'Message sended to client app',
                        error: null
                    }
                )
            }
        }else{
            return res.status(301).send(
                {
                    status: 301,
                    message: 'Something went wrong!',
                    error: null
                }
            )
        }
    }
}

export {
    sendChat
}