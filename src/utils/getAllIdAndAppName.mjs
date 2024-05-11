import { json } from "express";
import { connectToDatabase } from "../db/db.mjs"
import { projectAppModel } from "../models/projectApp.mjs";
import { investingAppModel } from "../models/investingApp.mjs";

// 1 - Investor App
// 2 - Project App

const getAllIdAndAppName = async (type=2) => {
    try {
        await connectToDatabase();
        let result;
        if(type === 1){
            result = await investingAppModel.find();
        }else{
            result = await projectAppModel.find();
        }
        return result;
    } catch (error) {
        return res.status(500).send(
            {
                status: 500,
                message: 'Internal server error!',
                error: error
            }
        )
    }
}

export {
    getAllIdAndAppName
}