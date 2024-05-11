const homeRoute = async (req, res, next) => {
    try {
        return res.send({
            status: 200,
            message: 'Working fine!',
            error: null
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: 'Not working fine!',
            error: error
        });
    }
}

export { homeRoute }