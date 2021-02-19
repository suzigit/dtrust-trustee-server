module.exports = (req, resp, next) => {
    const {authorization} = req.headers;
    
    if (!authorization || authorization!= "aabbcc") resp.status(401).send("Wrong password - Not authorized");
    next();
}