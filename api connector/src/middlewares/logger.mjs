const logger = async (req, res, next) => {
    console.log(req.originalUrl);
    next();
}

export { logger };