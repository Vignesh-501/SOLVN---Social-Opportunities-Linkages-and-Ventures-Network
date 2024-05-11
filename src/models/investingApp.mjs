import mongoose from "mongoose";

const investingAppSchema = new mongoose.Schema(
    {
        invAppName: String,
        invAppOwner: String,
        invAppSubscription: String,
        invAppLink: String,
        investorGetProjects: String,
        investerPostDetails: String,
        investerPostProjects: String,
        id: String
    }
)

const investingAppModel = new mongoose.model('investingApp', investingAppSchema);

export { investingAppModel };