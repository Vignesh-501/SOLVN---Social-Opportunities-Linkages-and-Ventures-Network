import { connectToDatabase } from "../db/db.mjs";
import { investingAppModel } from "../models/investingApp.mjs";
import { projectAppModel } from "../models/projectApp.mjs";

const verifyThisUnknownApp = async (data, type=2) => {
    // 1 for Investing APP
    // 2 For Project App
    try {
        await connectToDatabase();
        let result;
        if(type === 1){
            result = await investingAppModel.findOne(data);
        }else{
            result = await projectAppModel.findOne(data);
        }
        console.log(`Result ${result}`);
        if(result === null) return false;
        return true;

    } catch (error) {
        console.log(error);
        return true;
    }
}

export {
    verifyThisUnknownApp
}