const deleteProject = async (req, res, next) => {
    const {projectAppId, projectAppName, projectPostId, projectuserId} = req.body;
    if(projectAppId === undefined || projectAppName === undefined || projectPostId === undefined || projectuserId === undefined) {
        return res.status(400).send(
            {
                status: 400,
                message: 'Bad Request, Missing Parameter!',
                error: null
            }
        )
    };
    const isThisGuyValid = await verifyThisUnknownApp({projAppName: projectAppName, id: projectAppId});
    if(!isThisGuyValid) {
        return res.status(401).send(
            {
                status: 401,
                message: 'Authorization Error!',
                error: null
            }
        )
    };
    const allInvestorApp = await getAllIdAndAppName(1);
    let failCount = 0;
    let sendedApp = [];
    allInvestorApp.forEach(async (investorApp) => {
        const result = await axios.delete(investorApp.investorDeleteProject, {
            'id': projectAppId,
            'projAppName': projectAppName,
            'projectPostid': projectPostid,
            'projectUserId': projectuserId
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
    );
}

export {
    deleteProject
}