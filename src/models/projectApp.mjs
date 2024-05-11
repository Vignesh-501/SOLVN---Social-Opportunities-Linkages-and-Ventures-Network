import mongoose from "mongoose";

const projectAppScehma = new mongoose.Schema(
    {
        projAppName: String,
        projAppOwner: String,
        projAppSubscription: String,
        getInvestorPost: String,
        sendProjectDetails: String,
        id: String,
    }
);

const projectAppModel = new mongoose.model('projectapp', projectAppScehma);

export { projectAppModel };